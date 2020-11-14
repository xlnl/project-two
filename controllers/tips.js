const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require("../config/ppConfig.js")
const isLoggedIn = require("../middleware/isLoggedIn")

// GET /tips/new - show form to create new tip
router.get("/new", isLoggedIn, (req, res) => {
    db.province.findAll()
    .then((provinces) => {
        res.render("tips/new", { provinces: provinces })
    })
    .catch((err) => {
        console.log("errrrrrrrr!!!", err)
    })
})

// CREATE - add new tip by currentUser
router.post("/new/:id", isLoggedIn, (req, res) => {
    let userId = req.params.id
    db.tip.create({
        username: req.body.username,
        provinceName: req.body.provinceName,
        address: req.body.address,
        description: req.body.description,
        userId: userId,
        provinceId: req.body.provinceId,
    })
    .then((createdTip) => {
        res.redirect(`home/${userId}`)
    })
    .catch((err) => {
        console.log("errrrrrrrr!!!", err)
    })
})

// // post route for creating comments
// router.post('/:id/comments', (req, res) => {
//     let articleId = req.params.id;
//     console.log(req.body);
//     db.comment.create({
//       name: req.body.name,
//       content: req.body.content,
//       articleId: articleId
//     })
//     .then(() => {
//       res.redirect(`/articles/${articleId}`)
//     }).catch(error => {
//       console.log(error)
//     })
// })

// // GET /show/:id - display the user and their tips
// router.get("/show/:id", isLoggedIn, async (req, res) => {
//     db.user.findOne({
//         include: [db.tip],
//         where: { id: req.params.id },
//     })
//     .then((user) => {
//     res.render('/show', { user: user })
//     })
//     .catch((error) => {
//         console.log("errrrrrrr!!!!:", error)
//     })
// })

// // READ - shows more info about one tip
// router.get("/show/:id/:tipId", isLoggedIn, (req, res) => {
//     db.tip.findOne({
//         where: { 
//             id: req.params.userId,
//             tipId: req.params.id,
//         },
//         include: [db.user, db.tip]
//       })
//       .then((tip) => {
//         if (!tip) throw Error()
//         res.render("tips/show", {tip})
//       })
//       .catch((error) => {
//         console.log("errrrrrrr!!!!:", error)
//       })
// })


// // post route for creating comments
// router.post('/show/:id/comments', (req, res) => {
//     let tipId = req.params.id;
//     console.log(req.body);
//     db.comment.create({
//       name: req.body.name,
//       content: req.body.content,
//       tipId: tipId
//     })
//     .then(() => {
//       res.redirect(`/show/${tipId}`)
//     }).catch(error => {
//       console.log("errrrrrrrrr!!!!!!:", error)
//     })
// })


module.exports = router