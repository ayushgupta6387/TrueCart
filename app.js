const express = require("express");
const mongoose = require('mongoose');
// import routes
const useRoutes = require('./routes/user')


// app
const app = express();
require("dotenv").config();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=> console.log("DATABASE CONNECTED"));


// routes middleware
app.use("/api",useRoutes);


// this is written before using routes
// app.get('/', (req, res)=>{
//     res.send("Hello!")
// });

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});



