// Needed Resources 
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const invController = require("../controllers/invController") // Brings the invController into scope.

const Util = require('../utilities/')
const handleErrors = require('../utilities')

const classValidation = require('../utilities/new-class-validation');
const invValidation = require('../utilities/new-inv-validation');



/* ***************************
 *  GET
 * ************************** */

// Route to get inventory by classification view
    // "get" indicates that the route will listen for the GET method within the request (typically a clicked link or the URL itself).
    // "/type/:classificationId" is the route being watched for. 
    // "invController.buildByClassificationId" indicates that the buildByClassification function within the invController will be used to fulfill the request sent by the route.
router.get("/type/:classificationId", invController.buildViewByCarClassificationId);

// Route to get inventory item detail view
router.get('/detail/:id', invController.buildViewVehicleDetail);

// Route to get inventory
router.get('/getInventory/:classification_id', Util.handleErrors(invController.getInventoryJSON));

// Router to get the add-classification view
router.get("/add-classification", invController.buildViewClassificationForm);

// Router to get the add-inventory view
router.get("/add-inventory", invController.buildViewInventoryForm)

// Route to get the management view
router.get('/', 
    Util.checkLogin,
    Util.checkAccountType,
    Util.handleErrors(invController.buildViewInventoryManagement)
);

// Router to get the edit vehicle info view
router.get(
    "/edit/:inv_id",
    Util.handleErrors(invController.buildViewVehicleEditForm)
);

// Router to get the delete vehicle info view
router.get(
    "/delete/:inv_id",
    Util.handleErrors(invController.buildViewDeleteConfirmation)
);

/* ***************************
 *  POST
 * ************************** */

// Process the new Classification data
router.post(
    "/add-classification",
    classValidation.addingClassRules(),
    classValidation.checkClassData,
    Util.handleErrors(invController.processAddNewClassification)
)

// Process the new inventory data
router.post(
    "/add-inventory",
    invValidation.addingVehicleRules(),
    invValidation.checkVehicleData,
    Util.handleErrors(invController.processAddNewInventoryItem)
)

// Process the vehicle update
router.post(
    "/update",
    invValidation.addingVehicleRules(),
    invValidation.checkUpdatedVehicleData,
    Util.handleErrors(invController.updateVehicleData)
)

// Route to delete inventory
router.post("/delete", Util.handleErrors(invController.deleteVehicleData))

module.exports = router; // exports the router objects to be used elsewhere in the project.