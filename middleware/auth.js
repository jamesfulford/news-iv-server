const jwt = require('jsonwebtoken');

exports.loginRequired = function (req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			if (decoded) {
				return next();
			} else {
				return next({
					status: 401,
					message: "Please log in first",
					code: 8000,
				});
			}
		});
	} catch {
		return next({
			status: 401,
			message: "Please log in first",
			code: 8000,
		});
	}
}

exports.ensureCorrectUser = function (req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
			if (decoded && decoded.id === req.params.userId) {
				return next();
			} else {
				return next({
					status: 401,
					message: 'Unauthorized',
					code: 9000,
				});
			}
		})
	} catch {
		return next({
			status: 401,
			message: 'Unauthorized',
			code: 9000,
		});
	}
}
