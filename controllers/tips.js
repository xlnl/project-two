const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require("../middleware/isLoggedIn")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.ACCESS_TOKEN });


// GET /tips/new - show form to create new tip for currentUser
router.get("/new/:id", isLoggedIn, (req, res) => {
    let userId = req.user.id
    console.log(userId)
    db.province.findAll()
    .then((provinces) => {
        res.render("mytips/new", { provinces: provinces })
    })
    .catch((err) => {
        console.log("errrrrrrrr!!!", err)
    })
})


// CREATE - add new tip by currentUser
router.post("/new/:id", isLoggedIn, (req, res) => {
    let id = req.user.id
    // STRETCH GOAL - fetch lng/lat
    // STRETCH GOAL - add lng & lat 
    db.tip.create({
        username: req.body.username,
        address: req.body.address,
        description: req.body.description,
        userId: id,
        provinceId: req.body.provinceId,
    })
    .then((createdTip) => {
        console.log("Here's the created tip:", createdTip)
        res.redirect("/home/index")
    })
    .catch((err) => {
        console.log("errrrrrrrr!!!", err)
    })
})

// GET /show/:id - display the user's tips
router.get("/show/:id", isLoggedIn, (req, res) => {
    db.user.findOne({
        include: [db.tip],
        where: { id: req.params.id },
    })
    .then((user) => {
        console.log(user)
        res.render("mytips/show", { user })
    })
    .catch((err) => {
        console.log("errrrrrrr!!!!:", err)
    })
})

// PUT /edit/:id - update user's tips
router.put("/edit/:id", isLoggedIn, (req, res) => {
    let id = req.user.id
    // STRETCH GOAL - fetch lng/lat
    // STRETCH GOAL - add lng & lat 
    db.tip.update({
        username: req.body.username,
        address: req.body.address,
        description: req.body.description,
        provinceId: req.body.provinceId,
    },{
        where: {userId: req.user.id},
        include: [db.user]
    })
    .then((updatedTip) => {
        console.log("Here's the updated tip:", updatedTip)
        res.redirect("/home/index")
    })
    .catch((err) => {
        console.log("errrrrrrrr!!!", err)
    })
})

// GET /edit/:id - shows the edit tip form
router.get("/edit/:id", isLoggedIn, (req, res) => {
    db.tip.findOne({
        include: [db.user, db.province],
        where: { id: req.params.id },
    })
    .then((tip) => {
        console.log("Tip info!!!!!!!!!!!!!", tip.dataValues.province)
        db.province.findAll()
        .then((provinces)=>{
            if(tip.dataValues.userId === req.user.id) {
                res.render(`mytips/edit`, { tip: tip, tipProvince: tip.dataValues.province.dataValues, provinces: provinces })
            } else {
                res.redirect("/home/index")
            }
        })
    })
    .catch((err) => {
        console.log("errrrrrrrr!!!", err)
    })
})

// GET /show/:id - delete user's tips
router.delete("/show/tip/:id", isLoggedIn, (req, res) => {
    let userId = req.params.id
    db.tip.destroy({
        include: [db.user],
        where: { id: req.params.id },
    })
    .then((tip) => {
        console.log(tip)
        res.redirect(`/tips/show/${userId}`)
    })
    .catch((err) => {
        console.log("errrrrrrr!!!!:", err)
    })
})
// let lat = document.getElementById('lat').textContent
// let long = document.getElementById('long').textContent
// mapboxgl.accessToken = '<%= mapkey %>';
// let map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [long, lat], // starting position
//     zoom: 10 // starting zoom
// });
// // document.getElementById('map').addEventListener('click', new mapboxgl.Marker())
// let marker = new mapboxgl.Marker() // initialize a new marker
// .setLngLat([long, lat]) // Marker [lng, lat] coordinates
// .addTo(map); // Add the marker to the map

module.exports = router