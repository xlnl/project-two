const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require("../config/ppConfig.js")
const isLoggedIn = require("../middleware/isLoggedIn")

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
    db.tip.create({
        username: req.body.username,
        provinceName: req.body.provinceName,
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

// GET /show/:id - display the user and their tips
router.get("/show/:id", isLoggedIn, (req, res) => {
    db.user.findOne({
        include: [db.tip],
        where: { id: req.params.id },
    })
    .then((user) => {
    console.log(user.tips)
    res.render(`mytips/show`, { user })
    })
    .catch((err) => {
        console.log("errrrrrrr!!!!:", err)
    })
})




module.exports = router