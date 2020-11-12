const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require("../config/ppConfig.js")
const isLoggedIn = require("./middleware/isLoggedIn")
var NodeGeocoder = require("node-geocoder")

var options = {
    provider: "google",
    httpAdapter: "https",
    apiKey = process.env.GEOCODER_API_KEY,
    formatter: null
}

var geocoder = NodeGeocoder(options)

// CREATE - new route; add new tip to DB
router.get("/tips/new", isLoggedIn, (req, res) => {
    res.render("/tips/new")
})

// READ - show route; show all tips
router.get("/tips/show", isLoggedIn, (req, res) => {
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
router.get("tips/show/:id", isLoggedIn, (req, res) => {
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

// post route for creating comments
router.post("/home", isLoggedIn, (req, res) => {
    let tipId = req.params.id;
    console.log(req.body);
    db.comment.create({
      name: req.body.name,
      content: req.body.content,
      tipId: tipId
    })
    .then(() => {
      res.redirect("/home")
    }).catch(error => {
      console.log(error)
    //   res.status(400).render('main/404')
    })
  })