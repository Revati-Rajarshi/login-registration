const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://dbRevati:dbRevatipassword@eventsdb.nttcu.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true}, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}
router.get('/', (req, res) => {
    res.send('From API route')
})

//register api
router.post('/register', (req, res) => {
    //extract user info from request body
    let userData = req.body

    //convert the user info such that its structure can be understood by mongoose
    let user = new User(userData)

    //to save user info into database
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })

})

//login api
router.post('/login', (req, res) => {
    //extract user info from request body
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send('Invalid user')
            } else {
                if(user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })


})

//events api
router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        }
    ]
    res.json(events)
})


router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "event",
            "description": "lorem ipsum",
            "date": "2020-12-31T18:25:43.511Z"
        }
    ]
    res.json(events)
})

module.exports = router