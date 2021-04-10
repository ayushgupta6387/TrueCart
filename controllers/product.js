const formidable = require('formidable');

const fs = require('fs');
const _ = require('lodash');

const Product = require('../models/product');

const { errorHandler } = require('../helpers/dbErrorHandler');
const product = require('../models/product');

exports.productById = (req, res, next, id) => {
	Product.findById(id).exec((err, product) => {
		if (err || !product) {
			return res.status(400).json({
				error: 'Product is not found',
			});
		}
		req.product = product;
		next();
	});
};

exports.read = (req, res) => {
	req.product.photo = undefined;

	return res.json(req.product);
};

exports.create = (req, res) => {
	const form = new formidable.IncomingForm(); // for getting image from the user
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Image could not be uploaded',
			});
		}

	
		//check for all the fields
		const { name, description, price, category, quantity, shipping } = fields;
		if (!name || !description || !price || !category || !quantity || !shipping) {
			return res.status(400).json({
				error: 'All fields are required',
			});
		}

		let product = new Product(fields);

		// 1kb = 1000
		// 1mb = 1000000

		if (files.photo) {
			//console.log("Files photo", files.photo) //Checking file size

			if (files.photo.size > 1000000) {
				return res.status(400).json({
					error: 'Image should be less then 1mb',
				});
			}
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		product.save((err, result) => {
			if (err) {
				res.status(400).json({
					error: errorHandler(err),
				});
			}

			res.json(result);
		});
	});
};

exports.remove = (req, res) => {
	let product = req.product;
	product.remove((err, deleteProduct) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		return res.json({
			// deleteProduct,
			message: 'Product is deleted',
		});
	});
};

exports.update = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Image could not be uploaded',
			});
		}

		let product = req.product;
		product = _.extend(product, fields); //lodash extends methods //fields are updated argument

		// 1kb = 1000
		// 1mb = 1000000

		if (files.photo) {
			// console.log("FILES PHOTO: ", files.photo);
			if (files.photo.size > 1000000) {
				return res.status(400).json({
					error: 'Image should be less than 1mb in size',
				});
			}
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		product.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json(result);
		});
	});
};

/**
 *  sell / arrival
 *  by sell = /products?sortBy=sold&order=desc&limit=4
 *  by arrival = /products?sortBy=createdAt&order=desc&limit=4
 *  if no params are sent then all products are returned
 */

exports.list = (req, res) => {
	let order = req.query.order ? req.query.order : 'asc';
	let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
	let limit = req.query.limit ? parseInt(req.query.limit) : 6;

	Product.find()
		.select('-photo')
		.populate('category')
		.sort([[sortBy, order]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: 'Products not found',
				});
			}

			res.json(products);
		});
};

