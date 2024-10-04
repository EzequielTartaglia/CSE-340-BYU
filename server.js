/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts") // tells the application to require express-ejs-layouts so it can be used.
const env = require("dotenv").config()
const app = express()
const Util = require('./utilities/')
const session = require("express-session")
const pool = require('./database/')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

// Routes
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute") // brings inventoryRoute.js file into scope.
const accountRoute = require("./routes/accountRoute")

//Assignment 6
const maintenanceRoute = require("./routes/maintenanceRoute")

// Controllers
const baseController = require("./controllers/baseController"); // brings baseController.js into Scope.



/* ***********************
 * Middleware
 * ************************/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(session({ // Invokes the app.use() function and indicates a session will be applied.
  store: new (require('connect-pg-simple')(session))({ // store is refering where the session data will be stored.
    createTableIfMissing: true, // create a session table if it doesn't already exist.
    pool, // uses our db connection pool to interact with the db server.
  }), // closes the config data object and the new store session creation function.
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieParser())

app.use(Util.checkJWTToken)

/* ***********************
 * View Engine and Templates
 *************************/
// ejs will look for files with the extension .ejs e.g., file.ejs
app.set("view engine", "ejs") // Declares that ejs will be the view engine for our application. 
app.use(expressLayouts) // Tells the application to use this package that is stored into the expressLayouts variable.
app.set("layout", "./layouts/layout") // not at views root, when express ejs layout looks for the basic template for a view, it will find it in the layouts folder with the name layout.


/* ***********************
 * Routes
 *************************/
app.use(static) // the app itself will use this resource, this line of code allows the app to know where the public folder is located and that all of its subfolders will be used for static files.

// Index route
app.get("/", Util.handleErrors(baseController.buildHome))
app.get("/error", Util.handleErrors(baseController.error))

// Inventory routes
app.use("/inv", Util.handleErrors(inventoryRoute))

// Account routes
app.use("/account", Util.handleErrors(accountRoute))


// Assignment 6
// Maintenance routes
app.use("/maintenance", Util.handleErrors(maintenanceRoute))

/* ***********************
* Basic Error Handling Activity
* 
* File Not Found Route - must be last route in list
* Place after all routes.
*************************/
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'});
});


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await Util.getNavigation()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
