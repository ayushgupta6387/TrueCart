
const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken"); // To generate signed token
const expressJwt = require("express-jwt"); // For authorization check
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// It gives all the route sort of roads that have been requested in the console
const morgan = require('morgan');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // We are saving the user credentials in the cookie
const expressValidator = require('express-validator');

require('dotenv').config();
// app
const app = express();


// db
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DATABASE CONNECTED'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// this is written before using routes
// app.get('/', (req, res)=>{
//     res.send("Hello!")
// });


const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
