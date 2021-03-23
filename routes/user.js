const express = require('express');
const router = express.Router();

const { signup, signin, signout, requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// For sign up a new user
router.param('userId', userById);

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
	res.json({
		user: req.profile,
	});
});

module.exports = router;
