// Requirring mongosse
const mongoose = require('mongoose');

// Crypto for hashing our passwords
const crypto = require('crypto');

// This is for generating unique strings
const uuidvl = require('uuid/v1');

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
