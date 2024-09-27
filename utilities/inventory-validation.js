const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  Add Classification Data Validation Rules
 * ********************************* */
validate.addClassificationRules = () => {
    return [
        // classification name is required and must be string
        body("classification_name")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a classification name."), // on error this message is sent.

        // classification must not contain special characters
        body("classification_name")
            .trim()
            .custom((value) => {
            // use regex to check for special characters
            if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value)) {
                throw new Error("Classification name cannot contain special characters.")
            }
            return true
            }),

        // classification must not contain spaces
        body("classification_name")
            .trim()
            .custom((value) => {
            // check for spaces
            if (value.includes(" ")) {
                throw new Error("Classification name cannot contain spaces.")
            }
            return true
            }),

        // classification must not already exist in the DB
        body("classification_name")
            .trim()
            .custom(async (classification_name) => {
            const classificationExists = await invModel.checkExistingClassification(classification_name)
            if (classificationExists) {
                throw new Error("Classification already exists.")
            }
            }),
    ]
}


/*  **********************************
 *  Add Vehicle Data Validation Rules
 *  ********************************** */

validate.addVehicleRules = () => {
    return [
        // vehicle classification is required and must be number
        body("classification_id")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle classification."), // on error this message is sent.

        // vehicle make is required and must be string
        body("inv_make")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle make."), // on error this message is sent.

        // vehicle model is required and must be string
        body("inv_model")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle model."), // on error this message is sent.

        // vehicle year is required and must be number
        body("inv_year")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle year."), // on error this message is sent.
        
        // vehicle description is required and must be string
        body("inv_description")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle description."), // on error this message is sent.

        // vehicle price is required and must be number
        body("inv_price")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle price."), // on error this message is sent.

        // vehicle mileage is required and must be number
        body("inv_miles")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle mileage."), // on error this message is sent.

        // vehicle image is required and must be string of an image url
        /*
        body("inv_image")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle image."), // on error this message is sent.

        // vehicle thumbnail is required and must be string of an image url
        body("inv_thumbnail")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle thumbnail."), // on error this message is sent.
        */
        // vehicle color is required and must be string
        body("inv_color")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a vehicle color."), // on error this message is sent.
    ]
}


/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
validate.checkAddClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}


/* ******************************
 * Check data and return errors or continue to add vehicle
 * ***************************** */
validate.checkAddVehicleData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_image, inv_thumbnail, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationSelect = await utilities.getClassificationSelect()
        res.render("inventory/add-vehicle", {
            errors,
            title: "Add Vehicle",
            nav,
            classificationSelect,
            classification_id,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_price,
            inv_miles,
            inv_image,
            inv_thumbnail,
            inv_color,
        })
        return
    }
    next()
}


/* ******************************
 * Check data and return errors or continue to edit vehicle
 * ***************************** */
validate.checkUpdateVehicleData = async (req, res, next) => {
    const { classification_id, inv_id, inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_image, inv_thumbnail, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationSelect = await utilities.getClassificationSelect()
        res.render("inventory/edit-vehicle", {
            errors,
            title: "Edit " + itemName,
            nav,
            classificationSelect,
            classification_id,
            inv_id,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_price,
            inv_miles,
            inv_image,
            inv_thumbnail,
            inv_color,
        })
        return
    }
    next()
}


module.exports = validate