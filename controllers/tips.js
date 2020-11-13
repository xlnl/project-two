require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require("../config/ppConfig.js")
const isLoggedIn = require("../middleware/isLoggedIn")
var NodeGeocoder = require("node-geocoder")

var options = {
    provider: "google",
    httpAdapter: "https",
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
}

var geocoder = NodeGeocoder(options)

// NEW - show form to create new tip
router.get("/new", isLoggedIn, (req, res) => {
    res.render("/tips/new")
})

// CREATE - add new tip 
router.post("/new", isLoggedIn, (req, res) => {
    var username = {username: req.body.username, userId: req.body.userId}
    var provinceName = req.body.provinceName
    var description = req.body.description
    var provinceId = req.body.provinceId
    geocoder.geocode(req.body.address, (error, data) => {
        if( error || !data.length) {
            console.log(error)
            req.flash("error", "Invalid Address")
            return req.redirect("/new");
        }
        var lat = data[0].latitude
        var lng = data[0].longitude
        var address = data[0].formattedAddress
        var newTip = {username: username, address: address, provinceName: provinceName, description: description, provinceId: provinceId, lat: lat, lng: lng}
        // create tip and save to DB
        db.tip.create(newTip, (error, createdTip) => {
            if(error) {
                console.log("errrrrrrrrr!!!:", error)
            }else {
                console.log(createdTip)
            }
        })
    })
})

// READ - show route; show all tips 
router.get("/show", isLoggedIn, (req, res) => {
    db.tip.findAll({
        where: { username: req.params.username },
        include: [db.user]
    })
    .then((tip) => {
        if (!tip) throw Error()
        res.render("/tips/show", {tips:tip})
    })
    .catch((error) => {
        console.log("errrrrrrr!!!!:", error)
    })
})

// READ - shows more info about one tip
router.get("/show/:id", isLoggedIn, (req, res) => {
    db.tip.findOne({
        where: { id: req.params.id },
        include: [db.user]
      })
      .then((tip) => {
        if (!tip) throw Error()
        res.render("/tips/show", {tip})
      })
      .catch((error) => {
        console.log("errrrrrrr!!!!:", error)
      })
})

