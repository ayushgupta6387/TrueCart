const express = require('express');
const router = express.Router();

const { signup, signin, signout, requireSignin } = require('../controllers/auth');
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

// This will only run when the user is login beacuse we restrict the route by log in
// router.get('/hello', requireSignin, (req, res) => {
// 	res.send('hello there');
// });

module.exports = router;
