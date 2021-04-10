const express = require('express');
const router = express.Router();

const { create } = require('../controllers/product');
const { requireSign, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/product/create/:userId', create);

// For sign up a new user
router.param('userId', userById);

module.exports = router;
