
const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken"); // To generate signed token
const expressJwt = require("express-jwt"); // For authorization check
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

// It gives all the route sort of roads that have been requested in the console
const morgan = require('morgan');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // We are saving the user credentials in the cookie
const expressValidator = require('express-validator');
const cors = require("cors");

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
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

// this is written before using routes
// app.get('/', (req, res)=>{
//     res.send("Hello!")
// });


const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
