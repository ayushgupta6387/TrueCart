const express = require("express");
const router = express.Router();

const { isAuth, requireSign } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken, processPayment } = require("../controllers/braintree");
const { sign } = require("jsonwebtoken");

router.get("/braintree/getToken/:userId",  requireSign, isAuth, generateToken);
router.post(
    "/braintree/payment/:userId",
    requireSign,
    isAuth,
    processPayment
);


router.param("userId", userById);

module.exports = router;
