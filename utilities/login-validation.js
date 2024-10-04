const Util = require(".")
const {body, validationResult} = require("express-validator")
const accountModel = require("../models/account-model")
const validate = {}

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.loginRules = () => {
  return [
    // valid email is required and cannot already exist in the DB
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),

    // password is required and must be strong password
    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ]
}

/*  **********************************
 *  Registration Data Validation
 * ********************************* */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await Util.getNavigation()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
      
    })
    return
  }
  next()
}

/*  **********************************
 *  Account Update Data Validation Rules
 * ********************************* */
validate.updateAccountRules = () => {
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."), 

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."),
    
    // valid email is required and cannot already exist in the DB
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required."),
  ]
}

/*  **********************************
 *  Check Account Update Data Validation
 * ********************************* */
validate.checkEditAccountData = async (req, res, next) => {
  let nav = await Util.getNavigation()
  const { 
      account_firstname, 
      account_lastname, 
      account_email, 
      account_id 
    } = req.body
  const accountData = await accountModel.retrieveUserAccountById(account_id)
  if (account_email != accountData.account_email) {
    const emailExists = await accountModel.checkIfEmailExists(account_email)
    if (emailExists){
      errors.push("Email exists. Please log in or use different email")
    }
  }
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render("account/edit-account", {
      errors,
      title: "Edit Account",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    })
    return
  }
  next()
}

/*  **********************************
 *  Change Password Validation Rules
 * ********************************* */
validate.changePasswordRules = () => {
  return [
    // password is required and must be strong password
    body("account_password")
      .trim()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[?!.*@])[A-Za-z\d?!.*@]{12,}$/)
      .withMessage("Password does not meet requirements."),
  ]
}

  module.exports = validate;