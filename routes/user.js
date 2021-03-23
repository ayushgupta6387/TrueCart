const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/user');
const { userSignupValidator } = require('../validate/index');

router.post('/signup', userSignupValidator, signup);

// this is written before using controllers
// router.get("/", (req,res)=>{
//     res.send("Hello ABCD")
// });

module.exports = router;
