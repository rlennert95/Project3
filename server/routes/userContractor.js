const express = require('express')
const router = express.Router()
const ContractorUser = require('../database/models/userContractor')
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password, business, hometown } = req.body
    // ADD VALIDATION
    ContractorUser.findOne({ username: username }, (err, ContractorUser) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (ContractorUser) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newContractorUser = new User({
                username: username,
                password: password,
                business: business,
                hometown: hometown
            })
            newContractorUser.save((err, savedContractorUser) => {
                if (err) return res.json(err)
                res.json(savedContractorUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.ContractorUser);
        var userInfo = {
            username: req.ContractorUser.username,
            business: req.ContractorUser.business,
            hometown: req.ContractorUser.hometown
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.ContractorUser)
    if (req.ContractorUser) {
        res.json({ user: req.ContractorUser })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.ContractorUser) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router