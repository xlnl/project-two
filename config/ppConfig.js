const passport = require("passport")
const db = require("../models")
const LocalStrategy = require("passport-local")


// Passport "serializes" objects to make them easy to store, converting the user to an identified (id)
passport.serializeUser((user, doneCallback) => {
    console.log("serializing user....")
    doneCallback(null, user.id)
})

passport.deserializeUser((id, doneCallback) => {
    db.user.findByPk(id)
    .then(foundUser => {
        console.log("deserializing user....")
        doneCallback(null, foundUser)
    })
    .catch(err=>{
        console.log("error deserializing user")
    })
})

const findAndLogInUser = (username, password, doneCallback) => { // database call ! 
    db.user.findOne({where:{username:username}})
    .then(async foundUser => {
        let match
            if(foundUser) {
            match = await foundUser.validPassword(password)
        }
        if (!foundUser || !match) { // if there isn't a found user or valid password (bycrypt function that validates the password), return a null and send back "false" 
            console.log("password was NOT validate i.e. match is false")
            return doneCallback(null, false)
        } else { // user was legit, send the found user object
            return doneCallback(null, foundUser); 
        }
    }) // catch the error
    .catch(err=>doneCallback(err))
}

const fieldsToCheck = {
    usernameField: 'username',
    passwordField: 'password'
}

const strategy = new LocalStrategy(fieldsToCheck, findAndLogInUser)

passport.use(strategy)


module.exports = passport