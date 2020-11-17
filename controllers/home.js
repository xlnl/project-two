const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require("../middleware/isLoggedIn")
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

// HOME ROUTES

// displays list of provinces in central region of vn + links to all tips from that province
// (stretch) displays comment section for users to read other comments about a certain tip with the option to add, edit, and delete their own comments
router.get("/index", isLoggedIn, (req, res) => {
    db.province.findAll()
    .then((provinces) => {
    res.render("home/index", {provinces: provinces})    
    })
    .catch((err) => {
    console.log("errrrrrrrrrrrrrrrr!!!!:", err)
    })
})

// READ - shows more info about a province and their tips (if any)
router.get("/:id", isLoggedIn, (req, res) => {
    db.province.findOne({
        where: { id: req.params.id },
        include: [db.tip]
    })
    .then((province) => {
        console.log(province)
        if (!province) throw Error()
        res.render("home/show", {province: province})
    })
    .catch((error) => {
      console.log("errrrrrrr!!!!:", error)
    })
})
 

// GET /home/tip - list more info about a tip + show form to create new comment for a tip 
router.get("/tip/:id", isLoggedIn, (req, res) => {
    db.tip.findOne({
        where: {id: req.params.id},
        include: [db.comment] 
    })
    .then((tip) => {
        if (!tip) throw Error()
        console.log(tip.userId)
        console.log(tip.comments)
        res.render("home/tip", { tip: tip })
    })
    .catch((err) => {
        console.log("errrrrrrrr!!!", err)
    })
})

// post route for creating comments
router.post("/tip/:id/comments", isLoggedIn, (req, res) => {
    let tipId = req.params.id;
    console.log(req.body);
    db.comment.create({
      name: req.body.name,
      content: req.body.content,
      tipId: tipId
    })
    .then(() => {
      res.redirect(`/home/tip/${tipId}`)
    }).catch(error => {
      console.log("errrrrrrrrr!!!!!!:", error)
    //   res.status(400).render('main/404')
    })
})

module.exports = router