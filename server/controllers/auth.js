// Importing the userSchema model
const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
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
		return res.json({ user });
	});
};

exports.signin = (req, res) => {
	// Find the user based on email
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				err: 'user with that email does not exit. Please signup',
			});	
		}

		// If user is found make sure the email and password match
		// Create authenticate method in user model
		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: 'Email and password do not match',
			});
		}
		// generate a signed token with user id and secret
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

		// persist thhe token as "t" in cookie with expiry date
		res.cookie('t', token, { expire: new Date() + 9999 });

		// Return response with user and token to front client
		const { _id, name, email, role } = user;
		return res.json({ token, user: { _id, email, name, role } });
	});
};

// This method will delete user cookies and compleetly logiut the use from the aplication
exports.signout = (req, res) => {
	res.clearCookie('t');
	res.json({ message: 'Sign Out success' });
};

// If we want to restrict any route we can use requireSignin
exports.requireSign = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'], // added later
	userProperty: 'auth',
});


// One is for authenticate the user and one is for admin
exports.isAuth = (req, res, next) => {
	let user = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!user) {
		return res.status(403).json({
			error: 'Access Denied',
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: 'Admin resource! Access Denied',
		});
	}
	next();
};

