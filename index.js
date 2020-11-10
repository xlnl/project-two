require('dotenv').config()
const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const session = require("express-session")
const passport = require("./config/ppConfig.js")
const flash = require("connect-flash")
const isLoggedIn = require("./middleware/isLoggedIn")

// set up ejs and ejs layouts
app.set("view engine", "ejs")
app.use(ejsLayouts)

// body parser middleware to make req.body work
app.use(express.urlencoded({extended: false}))

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middeware - has to be after the session + passport middleware
app.use(flash())

// custom middleware so the messages are always available in our ejs and we don't have to pass through req.alerts to our ejs mannually
app.use((req, res, next)=>{
    //before every route, attach the flash message and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// use controllers
app.use("/auth", require("./controllers/auth.js"))

// home route - 
// displays tips in different counties by way of search bar -> google maps API
// displays comment section for users to read other comments about a certain tip with the option to add, edit, and delete their own comments
app.get("/", (req, res) => {
    res.render("home")
})

// my tips route - 
// displays all the tips currentUser has made including input information about it 
// renders the tip on the map 
// has the ability to show multiple tips at a time on the map (add addresses in an array for google maps API)
// currentUser has the option to update the tip with more information or delete the tip, if needed
app.get("/mytips", isLoggedIn, (req, res) => {
    res.render("mytips")
})

app.listen(process.env.PORT, ()=> { 
    console.log("You're listening to the spooky sounds of port 8000")
})