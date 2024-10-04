const Util = require(".")
const {body, validationResult} = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  New Class Data Validation Rules
 * ********************************* */

validate.addingClassRules = () => {
    return [
        body('classification_name')
        .trim()
        .isAlphanumeric()
        .isLength({min: 1})
        .notEmpty()
        .withMessage('Please provide a valid classification name.')
        .custom(async (classification_name) => {
            const nameExists = await invModel.checkExistingClass(classification_name);
            if (nameExists) {
                throw new Error('The classification name you provided already exists.');
            }
        })

    ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkClassData = async (req, res, next) => {
    const {classification_name} = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await Util.getNavigation();
        res.render("./inventory/add-classification", {
            errors, 
            title: "Add New Classification Error",
            nav,
            classification_name,
        })
        return
    }
    next()
}

module.exports = validate;