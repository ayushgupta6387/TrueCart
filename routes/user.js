const express = require('express');
const router = express.Router();

const { requireSign, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');




router.get('/secret/:userId', requireSign, isAuth, isAdmin, (req, res) => {
	res.json({
		user: req.profile,
	});
});


// For sign up a new user
router.param('userId', userById);


module.exports = router;
