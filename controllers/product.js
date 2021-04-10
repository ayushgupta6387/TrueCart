const formidable = require('formidable');

const fs = require('fs');
const _ = require('lodash');

const Product = require('../models/product');

const { errorHandler } = require('../helpers/dbErrorHandler');

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
