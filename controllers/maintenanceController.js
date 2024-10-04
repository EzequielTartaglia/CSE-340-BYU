const mainModel = require('../models/maintenance-model') // brings the inventory-model.js file into scope.
const Util = require('../utilities/') // brings the files from the utilities folder (i.e., the index.js file) into scope

const mainCont = {} // creates an empty object in the invCont variable.


mainCont.buildViewMaintenanceHistoryManagement = async (req, res, next) => {
    let nav = await Util.getNavigation()
    let vehicleInventoryList = await Util.buildVehicleInventorySelectList();
    res.render('maintenance/maintenance-history', {
        title: 'Maintenance History Tools', 
        nav,
        vehicleInventoryList,
        errors: null,
    })
}


/* ***************************
 *  buildViewGetAllReports - as a list
 * ************************** */


/* ***************************
 *  buildViewGetSingleReportById - by maintenance_history_id
 * ************************** */



/* ***************************
 *  buildViewAddReportForm
 * ************************** */
mainCont.buildAddReport = async (req, res, next) => {
    let nav = await Util.getNavigation()
    res.render("maintenance/add-report", {
        title: "Add New Report Form",
        nav,
        errors: null,
    })
};


/* ***************************
 *  buildViewDeleteReportByIdForm
 * ************************** */



/* ***************************
 *  buildViewEditReportByIdForm
 * ************************** */


/* ***************************
 *  Return InventoryReports As JSON
 * ************************** */
// Purpose: This function returns vehicle inventory by classification as JSON.
mainCont.getInventoryReportsJSON = async (req, res, next) => {
    const inv_id = parseInt(req.params.inv_id)
    const invData = await invModel.retrieveInventoryDataByClassificationId(inv_id)
    if (invData[0].inv_id) {
      return res.json(invData)
    } else {
      next(new Error("No data returned"))
    }
  }


/* ***************************
 *  processAddNewReport
 * ************************** */
// Purpose: This function processes the add new report.
mainCont.processAddNewReport = async (req, res, next) => {
    let nav = await Util.getNavigation()
    let vehicleInventoryList = await Util.buildVehicleInventorySelectList()
    let maintenanceManagementButtons = await Util.buildMaintenanceManagementButtons()
    const {
        maintenance_date,
        maintenance_type,
        maintenance_description,
        cost,
        parts_replaced,
        notes,
        mechanic_id,
        inv_id,
        status_id,
    } = req.body

    try {
        const maintenanceData = await mainModel.insertNewRecord(
            maintenance_date,
            maintenance_type,
            maintenance_description,
            mechanic_name,
            cost,
            parts_replaced,
            notes,
            mechanic_id,
            inv_id,
            status_id,
        )
        if (maintenanceData) {
            req.flash("notice", `You\'ve added another record to the maintenance history.`)
            // maintenance / maintenance-management.ejs
            res.status(201).render("maintenance/maintenance-management", { 
                title: "Vehicle Maintenance Management Tool",
                nav,
                vehicleInventoryList,
                maintenanceManagementButtons,
                errors: null,
            })
        } else {
            req.flash(
                "error",
                "There was an error. Check your information and try again."
            )
            // maintenance / add-report.ejs
            res.status(501).render("maintenance/add-report", {
                title: "Add New Maintenance Report",
                nav,
                vehicleInventoryList,
                errors: null,
            })
        }
    } catch (error) {
        req.flash("error", "Sorry, there was an error processing your request.")
        res.status(500).render("maintenance/add-report", {
            title: "Add New Maintenance Report",
            nav,
            vehicleInventoryList,
            errors: null,
        })
    }
}


/* ***************************
 *  processEditReport
 * ************************** */



/* ***************************
 *  processDeleteReport
 * ************************** */





module.exports = mainCont;