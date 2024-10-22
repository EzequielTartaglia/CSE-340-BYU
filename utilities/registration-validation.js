const Util = require(".")
const {body, validationResult} = require("express-validator")
const accountModel = require("../models/account-model")
const validate = {}

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
  validate.regRules = () => {
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
        .withMessage("A valid email is required.")
        .custom(async (account_email) => {
          const existingEmail = await accountModel.checkIfEmailExists(account_email)
          if (existingEmail) {
            throw new Error(
              "Email is already in use. Log in or try a different email."
            )
          }
        }),
  
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

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await Util.getNavigation()
      res.render("account/register", {
        title: "Registration",
        nav,
        account_firstname,
        account_lastname,
        account_email,
        errors,
      })
      return
    }
    next()
  }
  
  module.exports = validate;