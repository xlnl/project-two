const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require("../config/ppConfig.js")
const isLoggedIn = require("../middleware/isLoggedIn")

// GET /tips/new - show form to create new tip
router.get("/new", isLoggedIn, (req, res) => {
    db.user.findOne({
        where: {id: req.body.userId},
    })
    res.render("tips/new")
})

router.get('/new', (req, res) => {
    db.author.findAll()
    .then((authors) => {
      res.render('articles/new', { authors: authors })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
})

// CREATE - add new tip 
router.post("/new", isLoggedIn, (req, res) => {
    db.tip.create({
        username: req.body.username,
        provinceName: req.body.provinceName,
        address: req.body.address,
        description: req.body.description,
        userId: req.body.userId,
        provinceId: req.body.provinceId,
    })
    .then((createdTip) => {
        res.redirect('tips/show')
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
        res.render("tips/show", {tips:tip})
    })
    .catch((error) => {
        console.log("errrrrrrr!!!!:", error)
    })
})

// READ - shows more info about one tip
router.get("/show/:id", isLoggedIn, (req, res) => {
    db.tip.findOne({
        where: { id: req.params.id },
        include: [db.user, db.comment]
      })
      .then((tip) => {
        if (!tip) throw Error()
        console.log(tip.username)
        console.log(tip.comments)
        res.render("tips/show", {tip})
      })
      .catch((error) => {
        console.log("errrrrrrr!!!!:", error)
      })
})


// post route for creating comments
router.post('/show/:id/comments', (req, res) => {
    let tipId = req.params.id;
    console.log(req.body);
    db.comment.create({
      name: req.body.name,
      content: req.body.content,
      tipId: tipId
    })
    .then(() => {
      res.redirect(`/show/${tipId}`)
    }).catch(error => {
      console.log("errrrrrrrrr!!!!!!:", error)
    })
})


module.exports = router