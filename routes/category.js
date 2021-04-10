const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { requireSign, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.post('/category/:userId', requireSign, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSign, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSign, isAuth, isAdmin, remove);
router.get('/categories', list);

// For sign up a new user
router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
