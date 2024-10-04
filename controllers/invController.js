const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
      title: className + " Vehicles",
      nav,
      grid,
    })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
    const inv_id = req.params.inventoryId
    const data = await invModel.getInventoryByInventoryId(inv_id)
    const grid = await utilities.buildInventoryDisplay(data)
    let nav = await utilities.getNav()
    let d = data[0]
    const className = d.inv_year + " " + d.inv_make + " " + d.inv_model
    res.render("./inventory/detail", {
      title: className,
      nav,
      grid,
    })
}

/* *****************************
 *  Build inventory management page
 * **************************** */
invCont.buildInvManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  })
}

/* *****************************
 *  Build add classification page
 * **************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Add Classification
* *************************************** */
invCont.processAddNewClassification = async function (req, res, next) {
  const { classification_name } = req.body
  const result = await invModel.addNewClassification(classification_name)

  console.log("*********** :: " + JSON.stringify(result))
  if (result) {
    let nav = await utilities.getNav()
    req.flash('notice', `${classification_name} successfully added.`)
    res.status(201).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [],
    })
  } else {
    let nav = await utilities.getNav()
    req.flash("notice", "Something went wrong.")
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [],
    })
  }
}

/* *****************************
 *  Build add inventory page
 * **************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    errors: [],
  })
}

module.exports = invCont;