const express = require('express');
const router = express.Router();

const {sayHi} = require("../controllers/user");

router.get("/", sayHi);

// this is written before using controllers
// router.get("/", (req,res)=>{
//     res.send("Hello ABCD")
// });

module.exports = router;