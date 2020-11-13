const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require("../config/ppConfig.js")
const isLoggedIn = require("../middleware/isLoggedIn")
var NodeGeocoder = require("node-geocoder")

// home route - 
// displays tips in different counties by way of search bar -> google maps API
// displays comment section for users to read other comments about a certain tip with the option to add, edit, and delete their own comments
router.get("/", isLoggedIn, (req, res) => {
    // const key = process.env.PORT;
    res.render("home")
})

// post route for creating comments
router.post("/:id", isLoggedIn, (req, res) => {
    let tipId = req.params.id;
    console.log(req.body);
    db.comment.create({
      name: req.body.name,
      content: req.body.content,
      tipId: tipId
    })
    .then(() => {
      res.redirect(`/home/${tipId}`)
    }).catch(error => {
      console.log("errrrrrrrrr!!!!!!:", error)
    //   res.status(400).render('main/404')
    })
})

// READ - shows more info about one tip
router.get("/:id", isLoggedIn, (req, res) => {
  db.tip.findOne({
      where: { id: req.params.id },
      include: [db.user, db.comment]
    })
    .then((tip) => {
      if (!tip) throw Error()
      console.log(tip.username)
      console.log(tip.comments)
      res.render("/tips/show", {tip})
    })
    .catch((error) => {
      console.log("errrrrrrr!!!!:", error)
    })
})

module.exports = router