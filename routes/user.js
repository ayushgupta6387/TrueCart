const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/user');

router.post('/signup', signup);

// this is written before using controllers
// router.get("/", (req,res)=>{
//     res.send("Hello ABCD")
// });

module.exports = router;
