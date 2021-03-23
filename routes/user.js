const express = require('express');
const router = express.Router();

const { signup, signin, signout } = require('../controllers/user');
const { userSignupValidator } = require('../validate/index');

// For sign up a new user
router.post('/signup', userSignupValidator, signup);

// For signing in
router.post('/signin', signin);
// this is written before using controllers
// router.get("/", (req,res)=>{
//     res.send("Hello ABCD")
// });

// For signing out 
router.get('/signout', signout);

module.exports = router;
