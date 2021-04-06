// Requirring mongosse
const mongoose = require('mongoose');

// Creating user schema
const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
	},
	{ timestamps: true }
);

modeule.exports = mongoose.model('Category, categorySchema');
