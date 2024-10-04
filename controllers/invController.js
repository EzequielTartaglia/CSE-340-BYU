const invModel = require('../models/inventory-model') // brings the inventory-model.js file into scope.
const Util = require('../utilities/') // brings the files from the utilities folder (i.e., the index.js file) into scope

const invCont = {} // creates an empty object in the invCont variable.


/* ***************************
 *  Classification View 
 * ************************** */
// Purpose: This function builds the classification view by Id.
invCont.buildViewByCarClassificationId = async (req, res, next) => {
  try {
    const classification_id = req.params.classificationId;
    const data = await invModel.retrieveInventoryDataByClassificationId(classification_id);

    if (data && data.length > 0) {
      const className = data[0].classification_name;
      const grid = await Util.buildVehiclesListView(data);
      let nav = await Util.getNavigation();

      res.render('inventory/classification', {
        title: className + ' Vehicles',
        nav,
        grid,
      });
    } else {
      // Handle the case where data is empty (e.g., send a 404 response)
      res.status(404).send('No vehicles found for the given classification');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

invCont.buildViewVehicleDetail = async (req, res) => {
  try {
    const vehicle_id = req.params.id;
    const data = await invModel.retrieveVehicleDataById(vehicle_id);
    //console.log('Retrieved data:', data);

    const grid = await Util.buildVehicleDetailview(data);
    //console.log('Built grid:', grid);

    let nav = await Util.getNavigation();

    if (data.length > 0) {
      const vehicleTitle = `${data[0].inv_make} ${data[0].inv_model}`;
      res.render('inventory/detail', { 
        title: vehicleTitle, 
        nav, 
        grid, 
      });
    } else {
      res.status(404).send('Vehicle not found');
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


/* ***************************
 *  Management Tools View
 * ************************** */
// Purpose: This function builds the Inventory Management Tool View.
invCont.buildViewInventoryManagement = async (req,res,next) => {
  let nav = await Util.getNavigation();
  let managementButtons = await Util.buildInventoryManagementButtons();
  let classificationList = await Util.buildVehicleClassificationSelectList();
  
  res.render('inventory/inventory-management', {
    title: 'Inventory Management Tools',
    nav,
    managementButtons,
    classificationList,
    errors: null
  })
}

/* ***************************
 *  Classification Form View
 * ************************** */
// Purpose: This function builds the Classification Form View.
invCont.buildViewClassificationForm = async (req, res, next) => {
  let nav = await Util.getNavigation();
  res.render(
    'inventory/add-classification',
    {
      title: 'Register New Classification',
      nav,
      errors: null
    })
}

/* ***************************
 *  Inventory Form View
 * ************************** */
// Purpose: This function builds the Inventory Form View.
invCont.buildViewInventoryForm = async (req, res, next) => {
  let nav = await Util.getNavigation();
  let classificationList = await Util.buildVehicleClassificationSelectList();
  res.render(
    'inventory/add-inventory', 
    {
      title: 'Add New Inventory Item',
      nav,
      classificationList,
      errors: null
    })
}

/* ***************************
 *  Process Add Classification
 * ************************** */
// Purpose: This function processes the Add Classification.
invCont.processAddNewClassification = async (req, res, next) => {
  const { classification_name } = req.body
  const classNameResult = await invModel.insertNewVehicleClassificationByName( classification_name );
  if (classNameResult) {
    let nav = await Util.getNavigation();
    req.flash(
      'notice',
      `Awesome! ${classification_name} has been added.`
    )
    res.status(201).render(
      'inventory/add-classification', 
      {
        title: 'Successfully added new classification',
        nav,
        errors: null
      })
  } else {
    let nav = await Util.getNavigation();
    req.flash(
      'notice', 
      `Sorry, ${classification_name} could not be added.`
    )
    res.status(501).render(
      'inventory/add-classification', 
      {
        title: 'Add New Classification',
        nav,
        errors: null
      });
  }
}

/* ***************************
 *  Process Add Inventory
 * ************************** */
// Purpose: This function processes the Add Inventory.
invCont.processAddNewInventoryItem = async function (req, res, next) {
  let nav = await Util.getNavigation()
  let classificationList = await Util.buildVehicleClassificationSelectList()
  let managementButtons = await Util.buildInventoryManagementButtons()
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
    classification_id,
  } = req.body

  try {
    const inventoryData = await invModel.insertNewInventoryItem(
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
    )
    if (inventoryData) {
      req.flash("notice", `You\'ve added another vehicle to the inventory`)
      res.status(201).render("inventory/inventory-management", {
        title: "Inventory Management",
        nav,
        classificationList,
        managementButtons,
        errors: null,
      })
    } else {
      req.flash(
        "error",
        "There was an error. Check your information and try again."
      )
      res.status(501).render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classificationList,
        errors: null,
      })
    }
  } catch (error) {
    req.flash("error", "Sorry, there was an error processing your request.")
    res.status(500).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: null,
    })
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
// Purpose: This function returns vehicle inventory by classification as JSON.
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.retrieveInventoryDataByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Vehicle Edit Form View
 * ************************** */
// Purpose: This function builds the Vehicle Edit Form View.
invCont.buildViewVehicleEditForm = async (req, res, next) => {
  const inv_id = parseInt(req.params.inv_id);
  
  let nav = await Util.getNavigation();
  const vehicleData = await invModel.retrieveVehicleDataById(inv_id);
  const classificationList = await Util.buildVehicleClassificationSelectList();
  
  const vehicleEditTitle = `${vehicleData[0].inv_make} ${vehicleData[0].inv_model}`;

  res.status(201).render(
    'inventory/edit-inventory', 
    {
      title: 'Edit ' + vehicleEditTitle,
      nav,
      classificationList: classificationList,
      errors: null,
      inv_id: vehicleData[0].inv_id,
      inv_make: vehicleData[0].inv_make,
      inv_model: vehicleData[0].inv_model,
      inv_year: vehicleData[0].inv_year,
      inv_description: vehicleData[0].inv_description,
      inv_image: vehicleData[0].inv_image,
      inv_thumbnail: vehicleData[0].inv_thumbnail,
      inv_price: vehicleData[0].inv_price,
      inv_miles: vehicleData[0].inv_miles,
      inv_color: vehicleData[0].inv_color,
      classification_id: vehicleData[0].classification_id,
    })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
// Purpose: This function processes the edited vehicle data.
invCont.updateVehicleData = async function (req, res, next) {
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
  
  let nav = await Util.getNavigation()
  const inventoryResult = await invModel.updateVehicleData(inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
  const classificationList = await Util.buildVehicleClassificationSelectList(classification_id)
  if(inventoryResult){
    req.flash("notice", `Congratulations! ${inv_make} ${inv_model} has been Updated.`)
    res.redirect("/inv")
  } else {
    req.flash("notice", "Unfortunately the vehicle could not be updated.")
    res.status(501).render("inventory/edit-inventory", {
      title: `Edit ${inv_make} ${inv_model}`,
      nav,
      errors: null,
      classificationList: classificationList,
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
      classification_id,
    })
  }
}

/* ***************************
 *  Vehicle Delete Form View
 * ************************** */
// Purpose: This function builds the Vehicle Edit Form View.
invCont.buildViewDeleteConfirmation = async (req, res, next) => {
  const inv_id = parseInt(req.params.inv_id);
  let nav = await Util.getNavigation();
  const vehicleData = await invModel.retrieveVehicleDataById(inv_id);
  
  // Don't need this -> const classificationList = await Util.buildVehicleClassificationSelectList();
  
  const vehicleDeleteTitle = `${vehicleData[0].inv_make} ${vehicleData[0].inv_model}`;

  res.status(201).render(
    'inventory/delete-confirm', 
    {
      title: `Edit ${vehicleDeleteTitle}`,
      nav,
      // Don't need this -> classificationList: classificationList,
      errors: null,
      inv_id: vehicleData[0].inv_id,
      inv_make: vehicleData[0].inv_make,
      inv_model: vehicleData[0].inv_model,
      inv_year: vehicleData[0].inv_year,
      inv_price: vehicleData[0].inv_price,
    })
}

/* ***************************
 *  Delete Inventory Data
 * ************************** */
// Purpose: This function processes the deleted vehicle data.
invCont.deleteVehicleData = async function (req, res, next) {
  const {inv_id} = req.body
  const inventoryResult = await invModel.deleteVehicleData(inv_id)

  if(inventoryResult){
    req.flash("notice", `Congratulations! Vehicle has been deleted.`)
    res.redirect("/inv")
  } else {
    req.flash("notice", "Unfortunately the vehicle could not be deleted from inventory")
    res.redirect("inventory/delete-confirm")
  }
}


module.exports = invCont;