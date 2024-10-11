// This file will hold functions that are "utility" in nature, meaning that we will reuse them over and over, but they don't directly belong to the M-V-C structure.
const utilties = require(".")
const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const invModel = require("../models/inventory-model")
const accountMessage = require("../models/message-model")
const { retrieveCarClassifications } = require('../models/inventory-model')

const Util = {}
const validate = {}


/* **************************************
 *  Navigation Menu
 * ************************************ */
// Purpose: builds the navigation menu based on car classifications
Util.getNavigation = async function (req, res, next) {
    // Block: navigation
    let data = await invModel.retrieveCarClassifications();
    let list = "<ul class='navigation__list'>";

    list += '<li><a href="/" title="Home page" class="navigation__item">Home</a></li>';
    
    // Element within Block: navigation__list
    data.rows.forEach((row) => {
        list += "<li>";
        
        // Element within Block: navigation__item
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles" class="navigation__item">' +
            row.classification_name +
            "</a>";
        
        list += "</li>";
    });

    list += "</ul>";
    return list;
};


// **************************************
// Vehicle List View
// **************************************
// Purpose: builds a list of vehicles based on the provided data array.
Util.buildVehiclesListView = async function (data) {
  let grid;

  if (data.length > 0) {
    // Element within Block: vehicle-grid__ul-style
    grid = '<ul class="vehicle-grid__ul">';

    data.forEach(vehicle => {
      // Element within Block: vehicle-grid__li
      grid += '<li class="vehicle-grid__item">'; // Start of li
      grid += '<div class="vehicle-grid-card grid-cards">'; // start of vehicle grid div inv-display__image-info-container

      // Element within Block: vehicle-grid-card__image-container
      grid += '<div class="vehicle-grid-card__image-container">'; // start of vehicle grid image-container div
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +
        '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model +
        ' details" class="vehicle-grid-card__image-link"><img src="' + vehicle.inv_thumbnail +
        '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model +
        ' on CSE Motors" class="vehicle-grid-card__image"/></a>';
      grid += '</div>'; // End of vehicle grid image-container div

      // Element within Block: vehicle-grid-card__text
      grid += '<div class="vehicle-grid-card__text">'; // start of namePrice div

      grid += '<h1 class="vehicle-grid-card__title">';
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View ' +
        vehicle.inv_make + ' ' + vehicle.inv_model + ' details" class="vehicle-grid-card__link">' +
        vehicle.inv_make + ' ' + vehicle.inv_model + ' </a>';
      grid += '</h1>';

      grid += '<span class="vehicle-grid-card__price">$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
      grid += '</div>'; // End of vehicle grid text div

      grid += '</div>'; // End of vehicle grid container div

      grid += '</li>'; // End of li
    });
    grid += '</ul>';
  } else {
    // Element within Block: vehicle-grid__li
    grid += '<li class="vehicle-grid__item">';
    // Element within Block: notice
    grid += '<p class="vehicle-grid__notice">Sorry, no matching vehicles could be found.</p>';
    grid += '</li>';
  }

  // returns the variable to the calling location.
  return grid;
};


/* **************************************
 * Vehicle Detail View
 * ************************************ */
// Prupose: builds the vehicle detail view  
Util.buildVehicleDetailview = async function(data) {
    let grid = '';

    if (data.length > 0) {
        data.forEach(vehicle => {
            // Block: vehicle-detail-card
            grid += '<div class="vehicle-detail-card__container">'; // Start of container div

            // Element within Block: vehicle-detail-card__title
            //grid += `<div class="vehicle-detail-card__title"><h1>${vehicle.inv_make} ${vehicle.inv_model}</h1></div>`; // title div

            // Element within Block: vehicle-detail-card__content
            grid += `<div class="vehicle-detail-card__content">` // Start of vehicle detail content div

            // Element within Block: vehicle-detail-card__image
            grid += `<div class="vehicle-detail-card__image-container">` // Start of vehicle detail image div
            grid += `<img src=" ${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" class="vehicle-detail-card__image">`;
            grid += '</div>'; // End of vehicle detail image div

            // Element within Block: vehicle-detail-card__text
            grid += `<div class="vehicle-detail-card__text">` // Start of vehicle detail text div
            grid += `<p>Availability: ${vehicle.vehicle_status_type}</p>`;
            grid += `<p>Year: ${vehicle.inv_year}</p>`;
            grid += `<p>Price: $${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</p>`;
            grid += `<p>Mileage: ${new Intl.NumberFormat('en-US').format(vehicle.inv_miles)}</p>`;
            grid += `</div>`; // End of vehicle detail text div

            grid += `</div>`; // End of vehicle detail content div

            grid += '</div>'; // End of vehicle detail container div
        });
    } else {
        // Element within Block: notice
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
    }

    return grid;
};


/* **************************************
 * Classification Select List
 * ************************************ */
// Purpose: builds the select list for car classifications.
Util.buildVehicleClassificationSelectList = async function (classification_id = null) {
    let data = await invModel.retrieveCarClassifications();
    let classificationList =
      '<select name="classification_id" id="classificationList" >';
    classificationList += "<option>Choose a Classification</option>";
    data.rows.forEach((row) => {
      classificationList += `<option value="${row.classification_id}"${
        classification_id != null && row.classification_id == classification_id
          ? " selected"
          : ""
      }>${row.classification_name}</option>`;
      if (
        classification_id != null &&
        row.classification_id == classification_id
      ) {
        classificationList += " selected ";
      }
      classificationList += `>${row.classification_name}</option>}`;
    });
    classificationList += "</select>";
    
    return classificationList;
  };


/* **************************************
* Inventory/Classification Managment Tool
* ************************************ */
// Purpose: builds the Inventory Management Buttons -- add inventory and add classification.
Util.buildInventoryManagementButtons = async function () {
    let managementButtons = `
    <button type="button" class="management__button"><a href="/inv/add-classification" class="management-button-link">Add New Classification</a></button>
    <button type="button" class="management__button"><a href="/inv/add-inventory" class="management-button-link">Add New Vehicle</a></button>
    `;
    return managementButtons;
  };

/* ****************************************
 *  Check Login
 * ************************************ */
// Purpose: check if logged in
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}

/* ****************************************
 *  Check Account Type
 * ************************************ */
// Purpose: check account type
Util.checkAccountType = (req, res, next) => {
  if (res.locals.loggedIn) {
    if (res.locals.accountData.account_type == "Admin" || res.locals.accountData.account_type == "Employee") {
    next()
    }
  } else {
    return res.redirect("/account/login")
  }
}

/* **************************************
* Build account name options
* ************************************ */
Util.buildAccountOptions = async function (id) {
  let data = await accountMessage.getAllAccountData()
  let options
  options = '<select name="message_to" id="message_to" required>'
  options += '<option value="" selected disabled hidden> Select a recipient </option>'
  data.rows.forEach(row => {
     if (id != row.account_id) {
        options += `<option value="${row.account_id}"> ${row.account_firstname} ${row.account_lastname} </option>`
     }
  })
  options += '</select>'
  return options
}

/* **************************************
* Build message view 
* ************************************ */
Util.buildMessageView = async function (data) {
  let messageView
  if (data.length > 0) {
     messageView = '<div id="messageview">'
     data.forEach(row => {
        messageView += `<p><strong>Subject: </strong><span>${row.message_subject}</span></p>`
        messageView += `<p><strong>From: </strong><span>${row.account_firstname} ${row.account_lastname}</span></p>`
        messageView += `<p><strong>Message: </strong></p>`
        messageView += `<p id="messageB">${row.message_body}</p>`
     })
     messageView += '</div>'
  }
  return messageView
}

/* **************************************
* Build reply input form
* ************************************ */
Util.replyForm = async function (data) {
  let reply
  if (data.length > 0) {
     data.forEach(row => {
        let substr = 'RE:'
        reply = `<div class="inputField">
                    <label for="messageTo">To</label>
                    <input type="text" name="to" id="messageTo" value="${row.account_firstname} ${row.account_lastname}" readonly>
                    <input type="hidden" name="message_to" id="message_to" value="${row.message_from}">
                 </div>
                 <div class="inputField">
                    <label for="message_subject">
                    Subject
                    </label>`
        if (row.message_subject.indexOf(substr) >= 0) {
           reply += `<input type="text" name="message_subject" id="message_subject" value="${row.message_subject}" readonly>`
        } else {
           reply += `<input type="text" name="message_subject" id="message_subject" value="${substr} ${row.message_subject}" readonly>`
        }
        reply += '</div>'
     })
  }
  return reply
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
    if (req.cookies.jwt) {
     jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
       if (err) {
        req.flash("Please log in")
        res.clearCookie("jwt")
        return res.redirect("/account/login")
       }
       res.locals.accountData = accountData
       res.locals.loggedIn = 1
       next()
      })
    } else {
     next()
    }
   }

module.exports = Util;
