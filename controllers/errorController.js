const utilities = require("../utilities/")

const errorController = {}

errorController.build500Page = async function(req, res){
    const nav = await utilities.getNav()
    res.render("./errors/error500", {
        title: className + ":: Server Error ::",
        nav,
        grid
    })
}

module.exports = errorController