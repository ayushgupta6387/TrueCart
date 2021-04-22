const express = require('express');
const router = express.Router();

const {
	create,
	productById,
	read,
	remove,
	update,
	list,
	listRelated,
	listCategories,
	listBySearch,
	listSearch,
	photo,
} = require('../controllers/product');
const { requireSign, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSign, isAuth, isAdmin, create);

router.delete('/product/:productId/:userId', requireSign, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSign, isAuth, isAdmin, update);

router.get('/products', list);
router.get('/products/search', listSearch);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);

// For sign up a new user
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
