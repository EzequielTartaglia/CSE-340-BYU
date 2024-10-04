// Assignment 6

// Needed Resources 
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const mainController = require("../controllers/maintenanceController") // Brings the invController into scope.

const Util = require('../utilities')
const handleErrors = require('../utilities')

//const mainValidation = require('../utilities/maintenance-validation');

//const classValidation = require('../utilities/new-class-validation');
//const invValidation = require('../utilities/new-inv-validation');

/* ***************************
 *  GET
 * ************************** */
// Route to get the management view
router.get('/', 
    Util.checkLogin,
    Util.checkAccountType,
    Util.handleErrors(mainController.buildViewMaintenanceHistoryManagement)
);


module.exports = router; // exports the router objects to be used elsewhere in the project.