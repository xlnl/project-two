const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require("../config/ppConfig.js")
const isLoggedIn = require("../middleware/isLoggedIn")

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
        if (!province) throw Error()
        res.render("home/show", {province: province})
    })
    .catch((error) => {
      console.log("errrrrrrr!!!!:", error)
    })
})


// // post route for creating comments
// router.post("/:id", isLoggedIn, (req, res) => {
//     let tipId = req.params.id;
//     console.log(req.body);
//     db.comment.create({
//       name: req.body.name,
//       content: req.body.content,
//       tipId: tipId
//     })
//     .then(() => {
//       res.redirect(`/home/${tipId}`)
//     }).catch(error => {
//       console.log("errrrrrrrrr!!!!!!:", error)
//     //   res.status(400).render('main/404')
//     })
// })

module.exports = router