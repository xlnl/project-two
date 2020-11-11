var db = require('./models')


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