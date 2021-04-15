exports.userSignupValidator = (req, res, next) => {
	// Validating name that it is not empty
	req.check('name', 'Name is required').notEmpty();

	// Validation on email that it has @ compulsory
	req.check('email', 'Email must be between 3 to 32 characters')
		.matches(/.+\@.+\..+/)
		.withMessage('Email must contain @')
		.isLength({
			min: 4,
			max: 32,
		});

	// Validating password that a number is required and its length upt to 6
	req.check('password', 'password is required').notEmpty();
	req.check('password')
		.isLength({ min: 6 })
		.withMessage('Password must not contain at least 6 characters')
		.matches(/\d/)
		.withMessage('Password must contain a number');

	// If there is any error in any of the fields so it will capture
	// that error and it is shown to the user
	const errors = req.validationErrors();
	if (errors) {
		const firstError = errors.map((error) => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}

	// next() helps the application not to halt at this stage otherwise our application
	// doesn't move forward
	next();
};
