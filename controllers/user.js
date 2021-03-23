// Importing the userSchema model
const User = require('../models/user');

// handling different types of error by routing it to dbErrorHandler.js
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
	console.log(req.body);
	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				err: errorHandler(err),
			});
		}
		
		// This will make our hashed password and salt string not visible in database
		user.salt = undefined;
		user.hashed_password = undefined;
		res.json({ 
			user,
		});
	});
};
