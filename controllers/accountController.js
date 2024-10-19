const Util = require("../utilities/")
const bcrypt = require("bcryptjs")
const accountModel = require("../models/account-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const accountController = {} // creates an empty object in the accCont variable.

/* ****************************************
 *  Deliver login View
 * *************************************** */
accountController.buildLoginView = async (req, res, next) => {
  let nav = await Util.getNavigation()
  res.render("account/login", { // views/account/login
    title: "Login Form",
    nav,
  })
};

/* ****************************************
 *  Deliver registration View
 * *************************************** */
accountController.buildRegisterView = async (req, res, next) => {
  let nav = await Util.getNavigation()
  res.render("account/register", {
    title: "Registration Form",
    nav,
    errors: null,
  })
};

/* ****************************************
 *  Account Management View (After someone has logged in.)
 * *************************************** */
accountController.buildAccountManagementHomeView = async (req, res, next) => {
  let nav = await Util.getNavigation()
  res.render("account/account-management", {
    title: "Account Management",
    nav,
    errors: null,
  })
};

/* ****************************************
 *  Edit Account View
 * *************************************** */
accountController.buildEditAccountView = async (req, res, next) => {
  let nav = await Util.getNavigation()
  let account_id = parseInt(req.params.account_id)
  let accountData = await accountModel.retrieveUserAccountById(account_id)
  res.render("account/edit-account", {
    title: "Edit Account",
    nav,
    errors: null,
    account_firstname: accountData.account_firstname,
    account_lastname: accountData.account_lastname,
    account_email: accountData.account_email,
    account_id: account_id
  })
};


/* ****************************************
*  Process Registration
* *************************************** */
accountController.registerNewAccount = async function (req, res, next) {
    let nav = await Util.getNavigation()
    const { 
      account_firstname, 
      account_lastname, 
      account_email, 
      account_password } = req.body
  
    // Hash the password
    let hashedPassword = await bcrypt.hashSync(account_password, 10);

    const regResult = await accountModel.insertNewUserAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
      //account_password 
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Fantastic! You\'re registered ${account_firstname}. Please log in.`
      )
      res.status(201).render("account/login", {
        title: "Login",
        nav,
      })
    } else {
      req.flash(
        "notice", 
        "Sorry, the registration failed."
      )
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
      })
    }
  }

/* ****************************************
*  Process Login Request
* *************************************** */
accountController.processAccountLogin = async function (req, res) {
  let nav = await Util.getNavigation()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.retrieveUserAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
      if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      return res.redirect("/account/")
      }
  } catch (error) {
      return new Error('Access Forbidden')
  }
}
/* ****************************************
 *  Process Account Update
 * *************************************** */
accountController.processAccountUpdate = async (req, res, next) => {
  try {
    let nav = await Util.getNavigation();
    const { account_firstname, account_lastname, account_email, account_id } = req.body;

    // Actualizar la información de la cuenta
    const regResult = await accountModel.updateAccountInfo(account_firstname, account_lastname, account_email, account_id);
    console.log('Reg Result:', regResult); // Verifica el resultado

    // Verificar que regResult sea igual a 1 para indicar éxito
    if (regResult === 1) {
      res.clearCookie("jwt"); // Limpiar la cookie anterior

      // Obtener los datos de la cuenta actualizada
      const accountData = await accountModel.retrieveUserAccountById(account_id);
      console.log('Account Data for Token:', accountData); // Asegúrate de que los datos sean correctos

      // Crear un nuevo token de acceso
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 });

      // Renderizar la vista con datos actualizados
      req.flash("success", `Congratulations, ${accountData.account_firstname} you’ve successfully updated your account info.`);
      res.status(200).render("account/account-management", {
        title: "Account Management",
        nav,
        errors: null,
        account_firstname: accountData.account_firstname,
        account_lastname: accountData.account_lastname,
        account_email: accountData.account_email,
      });
    } else {
      req.flash("error", "Sorry, the update failed.");
      console.error('Update failed for account:', account_id); 
      res.status(400).render("account/edit-account", {
        title: "Edit Account",
        nav,
        errors: null,
        account_firstname,
        account_lastname,
        account_email,
      });
    }
  } catch (error) {
    console.error('Error processing account update:', error);
    req.flash("error", "An unexpected error occurred.");
    res.status(500).render("account/edit-account", {
      title: "Edit Account",
      nav,
      errors: null,
      account_firstname,
      account_lastname,
      account_email,
    });
  }
};


/* ****************************************
*  Process Password Update
* *************************************** */
accountController.processAccountPasswordUpdate = async (req, res, next) => {
  let nav = await Util.getNavigation()
  const 
    { 
      account_password, 
      account_id 
    } = req.body
  
  let hashedPassword
  
  try {
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the password update.')
    res.status(500).render("account/edit-account", {
      title: "Edit Account",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.updateAccountPassword(hashedPassword, account_id)

  if (regResult) {
    const accountData = await accountModel.retrieveUserAccountById(account_id)
    req.flash("success", `Congratulations, ${accountData.account_firstname} you\'ve succesfully updated your account password.`)
    res.status(201).render("account/account-management", {
      title: "Edit Account",
      nav,
      errors:null,
    })
  } else {
    req.flash("error", "Sorry, the password update failed.")
    res.status(501).render("account/edit-account", {
      title: "Edit Account",
      nav,
      errors: null,
    })
  }
}


/* ****************************************
*  Logout User
* *************************************** */
accountController.logoutAccount = async (req, res, next) => {
  res.clearCookie('jwt')
  res.redirect("/")
  return
}

module.exports = accountController;