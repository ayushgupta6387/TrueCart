const express = require('express');
const router = express.Router();

const { create, productById, read, remove, update, list, listRelated} = require('../controllers/product');
const { requireSign, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSign, isAuth, isAdmin, create);

router.delete('/product/:productId/:userId', requireSign, isAuth, isAdmin, remove);
router.put("/product/:productId/:userId", requireSign, isAuth, isAdmin, update);

router.get("/products", list);
router.get("/products/realed/:productId", listRelated);

// For sign up a new user
router.param('userId', userById);
router.param('productId', productById);


module.exports = router;
