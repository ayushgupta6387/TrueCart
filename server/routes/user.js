const express = require('express');
const router = express.Router();

const { requireSign, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, purchaseHistory, update } = require('../controllers/user');




router.get('/secret', requireSign, (req, res) => {
	res.json({
		user: 'got here yay',
	});
});

router.get('/user/:userId', requireSign, isAuth, read);
router.put('/user/:userId', requireSign, isAuth, update);
router.get('/orders/by/user/:userId', requireSign, isAuth, purchaseHistory);


// For sign up a new user
router.param('userId', userById);


module.exports = router;
