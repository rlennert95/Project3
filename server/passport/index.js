const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../database/models/user')
const ContractorUser = require('../database/models/userContractor')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('*** serializeUser called, user: ')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called')
	User.findOne(
		{ _id: id },
		'username',
		(err, user) => {
			console.log('*** Deserialize user, user:')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})

passport.serializeUser((ContractorUser, done) => {
	console.log('*** serializeUser called, user: ')
	console.log(ContractorUser) // the whole raw user object!
	console.log('---------')
	done(null, { _id: ContractorUser._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called')
	ContractorUser.findOne(
		{ _id: id },
		'username',
		(err, user) => {
			console.log('*** Deserialize user, user:')
			console.log(ContractorUser)
			console.log('--------------')
			done(null, ContractorUser)
		}
	)
})
//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport
module.exports = passport
