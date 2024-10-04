// A controller is the location where the logic of the application resides.
// It is responsible for determining what action is to be carried out in order to fulfill requests submitted from remote clients.
// The base controller will be responsible only for requests to the application in general, not specific areas such as inventory or accounts.

const utilities = require("../utilities/")
const baseController = {}

class IntentionalError extends Error {
    constructor(message = "An intentional error occurred") {
      super(message);
      this.name = "Intentional Error";
    }
  }

baseController.buildHome = async function(req, res){
    const nav = await utilities.getNavigation()
    req.flash("notice", "This is a flash message.")
    res.render("index", {title: "Home", nav})
}

baseController.error = async function(req, res) {
    throw new IntentionalError("This page is intentionally broken. See /controllers/baseController.js line 10.");
};



module.exports = baseController