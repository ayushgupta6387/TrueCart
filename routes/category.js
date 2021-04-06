const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category');
const { requireSign, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/category/:userId', requireSign, isAuth, isAdmin, create);

// For sign up a new user
router.param('userId', userById);

module.exports = router;
