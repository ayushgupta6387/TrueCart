const express = require('express');
const router = express.Router();

const { requireSign, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { productById, read } = require('../controllers/product');



router.get('/secret/:userId', requireSign, isAuth, isAdmin, (req, res) => {
	res.json({
		user: req.profile,
	});
});

router.get('/product/:productId', read);

// For sign up a new user
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
