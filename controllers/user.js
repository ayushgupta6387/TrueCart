const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        req.profile = user;
        next(); //because it is a middle way we have to use next so that our application doesn't stuck
    });
};
