// Needed Resources 
const logValidate = require('../utilities/login-validation')
const regValidate = require('../utilities/registration-validation')
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const accountController = require("../controllers/accountController") // Brings the invController into scope.
const Util = require('../utilities/');

/* ***************************
 *  GET
 * ************************** */
// Deliver Default Account View
router.get(
  "/", 
  Util.checkLogin, 
  Util.handleErrors(accountController.buildAccountManagementHomeView)
);

// Deliver Login View
router.get("/login", accountController.buildLoginView);

// Deliver Edit Account View
router.get(
  "/logout",
  Util.handleErrors(accountController.logoutAccount),
)

// Deliver Register View
router.get("/register", accountController.buildRegisterView);

// Deliver Edit Account View
router.get("/edit/:account_id", accountController.buildEditAccountView);



/* ***************************
 *  POST
 * ************************** */
// Process the login data
router.post(
  "/login",
  logValidate.loginRules(),
  logValidate.checkLoginData,
  Util.handleErrors(accountController.processAccountLogin)
)

// Process the registration data
router.post(
  "/register",
  regValidate.regRules(),
  regValidate.checkRegData,
  Util.handleErrors(accountController.registerNewAccount)
)

// Process the account update
router.post(
  "/update-account",
  logValidate.updateAccountRules(),
  logValidate.checkEditAccountData,
  Util.handleErrors(accountController.processAccountUpdate)
)

// Process the account password change
router.post(
  "/change-password",
  logValidate.changePasswordRules(),
  logValidate.checkEditAccountData,
  Util.handleErrors(accountController.processAccountPasswordUpdate)
)

module.exports = router; // exports the router objects to be used elsewhere in the project.