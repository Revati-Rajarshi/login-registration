const mongoose = require('mongoose')
//instance of mongoose Schema
const Schema = mongoose.Schema

//create a new Schema for userData in mongodb
const userSchema = new Schema( {
    email: String,
    password: String
})

//to create mongoose model
module.exports = mongoose.model('user',userSchema,'users')