const Util = require(".")
const {body, validationResult} = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  New Inv Data Validation Rules
 * ********************************* */
validate.addingVehicleRules = () => {
    return [
        body("inv_price")
          .trim()
          .isNumeric()
          .withMessage("Please provide a valid price."),
        body("inv_miles")
          .trim()
          .isNumeric()
          .withMessage("Please provide a valid number of miles."),
        body("classification_id")
          .trim()
          .isNumeric()
          .withMessage("Please provide a valid classification ID."),
        body("inv_description")
          .trim()
          .isLength({ min: 3 })
          .withMessage("Please provide a description."),
        body("inv_image")
          .trim()
          .isLength({ min: 3 })
          .withMessage("Please provide an image path."),
        body("inv_thumbnail")
          .trim()
          .isLength({ min: 3 })
          .withMessage("Please provide a thumbnail path."),
        body("inv_color")
          .trim()
          .isLength({ min: 2 })
          .withMessage("Please provide a color."),
        body("inv_make")
          .trim()
          .isLength({ min: 3 })
          .withMessage("Please provide a make."),
        body("inv_model")
          .trim()
          .isLength({ min: 3 })
          .withMessage("Please provide a model."),
        body("inv_year")
          .trim()
          .isNumeric()
          .withMessage("Please provide a valid year."),
      ]
}


/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkVehicleData = async (req,res,next) => {
    const {
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
    } = req.body

    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await Util.getNavigation()
        let classificationList = await Util.buildVehicleClassificationSelectList()
        res.render("inventory/add-inventory", {
            title: "Add New Vehicle",
            errors,
            nav,
            classificationList,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classification_id,
        })
        return
    }
    next()
}


/* ******************************
 * Check updated vehicle data
 * ***************************** */
validate.checkUpdatedVehicleData = async (req, res, next) => {
  const {
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    } = req.body

  let newName = `${inv_make} ${inv_model}`
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await Util.getNavigation()
    let classificationList = await Util.buildVehicleClassificationSelectList(classification_id)
    res.render("inventory/edit", {
      errors,
      title: `Edit ${newName}`,
      nav,
      classificationList,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
    return
  }
  next()
}

module.exports = validate;