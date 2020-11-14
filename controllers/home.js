const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require("../config/ppConfig.js")
const isLoggedIn = require("../middleware/isLoggedIn")

// home route - 
// displays list of provinces in central region of vn + links to all tips from that province
// (stretch) displays comment section for users to read other comments about a certain tip with the option to add, edit, and delete their own comments
router.get("/", isLoggedIn, (req, res) => {
    db.province.findAll({
        include: [db.tip]
    })
    .then((tips) => {
    res.render("/home/index", {tips: tips})    
    })
    .catch((err) => {
    console.log("errrrrrrrrrrrrrrrr!!!!:", err)
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

// // READ - shows more info about one tip
// router.get("/:id", isLoggedIn, (req, res) => {
//   db.tip.findOne({
//       where: { id: req.params.id },
//       include: [db.user, db.comment]
//     })
//     .then((tip) => {
//       if (!tip) throw Error()
//       console.log(tip.username)
//       console.log(tip.comments)
//       res.render("/tips/show", {tip})
//     })
//     .catch((error) => {
//       console.log("errrrrrrr!!!!:", error)
//     })
// })

module.exports = router