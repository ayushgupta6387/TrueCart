const express = require("express");
const router = express.Router();

const { requireSign, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrders, getStatusValues } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post("/order/create/:userId", requireSign, 
isAuth, 
addOrderToUserHistory, 
decreaseQuantity,
create);

router.get("/order/list/:userId", requireSign, isAuth, isAdmin, listOrders);

router.get(
    "/order/status-values/:userId",
    requireSign,
    isAuth,
    isAdmin,
    getStatusValues
);



router.param("userId", userById);

module.exports = router;
