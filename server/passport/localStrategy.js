const User = require('../database/models/user')
const ContractorUser = require('../database/models/userContractor')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	},
	function(username, password, done) {
		ContractorUser.findOne({ username: username }, (err, ContractorUser) => {
			if (err) {
				return done(err)
			}
			if (!ContractorUser) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!ContractorUser.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, ContractorUser)
		})
	}
)

module.exports = strategy
