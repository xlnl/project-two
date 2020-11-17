require('dotenv').config()
var db = require('./models')
const express = require('express')
const router = express.Router()
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.ACCESS_TOKEN })
const Axios = require("axios");


const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/515%2015th%20St%20NW%2C%20Washington%2C%20DC%2020004.jsonç?types=address&access_token=${process.env.ACCESS_TOKEN}`;
  // Use request to call the API
  Axios.get(mapboxUrl).then(function(apiResponse) {
    const match = apiResponse.body.features 
    const lat = match.geometry.coordinates[0]
    const lng = match.geometry.coordinates[1]
    console.log(lat)
    console.log(lng)
    })

// geocodingClient
//   .forwardGeocode({
//     query: 'Quang tri, vn'
//   })
//   .send()
//   .then(response => {
//     const match = response.body;
//     match.features.forEach(match => {
//         console.log(match.geometry)
//     })
//   });

// geocodingClient
//   .forwardGeocode({
//     query: 'Seattle, WA'
//   })
//   .send()
//   .then(response => {
//     const match = response.body;
//     console.log(match);
//   });

// db.user.create({
//     firstName: 'joe',
//     lastName: "shmoe",
//     phone: "123-456-7891",
//     county: "galaxy",
//     city: "Star City",
//     username: "xmercuryretrograde",
//     password: "blahblahblah"
// })

// db.tip.create({
//   firstName: 'joe',
//   lastName: "shmoe",
//   address: "1234 Moon Drive, Star City, AZ 12345",
//   countyName: "galaxy",
//   userId: 1,
//   description: "very suspicious metal thing",
//   countyId: 3
// }).then(function(tip) {
//   console.log(tip.get())
//   console.log("here it is:", tip)
// })

// db.tip.findOne({
//     where: { id: 1 },
//     include: [db.user]
//   }).then(function(tip) {
//     // by using eager loading, the article model should have a comments key
//     console.log(tip.user)
//   })

module.exports = router