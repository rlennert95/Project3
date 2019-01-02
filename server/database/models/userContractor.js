const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const ContractorSchema = new Schema({

	username: { type: String, unique: false, required: false },
    password: { type: String, unique: false, required: false },
    business: { type: String, unique: false, required: false },
    hometown: { type: String, unique: false, required: false }

})

// Define schema methods
ContractorSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
ContractorSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const ContractorUser = mongoose.model('ContractorUser', ContractorSchema)

module.exports = ContractorUser