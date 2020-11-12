require('dotenv').config()
const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const session = require("express-session")
const passport = require("./config/ppConfig.js")
const flash = require("connect-flash")
const isLoggedIn = require("./middleware/isLoggedIn")
const { google } = require("googleapis")
const request = require("request")
const cors = require("cors")
const urlParse = require("url-parse")
const queryParse = require("query-string")
const bodyParser = require("body-parser")
const axios = require("axios")


// set up ejs and ejs layouts
app.set("view engine", "ejs")
app.use(ejsLayouts)

app.use(express.static(__dirname + '/public/'))

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

app.use(cors())
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

// use controllers
app.use("/auth", require("./controllers/auth.js"))

// landing route - 
// displays intro video 
// short description of mission + call to action with "join" link to sign up
app.get("/", (req, res) => {
    res.render("landing")
})

// home route - 
// displays tips in different counties by way of search bar -> google maps API
// displays comment section for users to read other comments about a certain tip with the option to add, edit, and delete their own comments
app.get("/home", (req, res) => {
    const key = process.env.PORT;
    res.render("home", {key})
})

app.get("/tips/new", isLoggedIn, (req, res) => {
    res.render("tips/new")
})

app.get("/tips/show", isLoggedIn, (req, res) => {
    res.render("tips/show")
})


app.listen(process.env.PORT, ()=> { 
    console.log("You're listening to the spooky sounds of port 8000")
})


