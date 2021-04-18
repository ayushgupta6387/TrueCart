

// Requirring mongosse
const mongoose = require('mongoose');

// Crypto for hashing our passwords
const crypto = require('crypto');

// This is for generating unique strings
const { v1: uuidv1 } = require('uuid');

// Creating user schema
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: 32,
		},
		hashed_password: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			trim: true,
		},
		salt: String,
		role: {
			type: Number,
			default: 0,
		},
		history: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

// Virtual Field
userSchema
	.virtual('password') //password we get from the client side for encrypting
	.set(function (password) {
		this._password = password;
		this.salt = uuidv1(); // this will give us random string that we are going to use in hashing
		this.hashed_password = this.encryptPassword(password); // this method wil encrypt the password
	})
	.get(function () {
		return this._password;
	});

// Adding methods to the userSchema
userSchema.methods = {
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},
	encryptPassword: function (password) {
		if (!password) return '';
		try {
			return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
		} catch (err) {
			return '';
		}
	},
};

// Exporting mongoose model
module.exports = mongoose.model('User', userSchema);

