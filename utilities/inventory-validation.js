const utilities = require(".")
const { body, validationResult } = require("express-validator")
const inventoryModel = require("../models/inventory-model")

const validate = {}

/* **********************************
 * Classification rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        // classification name is required and must be string
        body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a classification name.")
        .custom( async (classification_name) => {
            const classificationExists = await inventoryModel.checkForClassification(classification_name)
            if (classificationExists){
                throw new Error("Classification already exists: " + classification_name)
            }
        })
    ]
}

/* ******************************
 * Check classification data
 * ***************************** */
validate.checkClassification = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []

    errors = validationResult(req)
    console.log("&&&&&&&&&&&&&& :: " + JSON.stringify(errors))
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

module.exports = validate