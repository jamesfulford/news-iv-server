const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
	signin: async function(req, res, next) {
		try {
			const user = await db.User.findOne({
				email: req.body.email,
			});
			if (!user) {
				return next({
					status: 400,
					message: "Invalid email/password",
					code: 10000
				});
			}
			const isMatch = await user.comparePassword(req.body.password);

			if (isMatch) {
				const { id, username, email, profileImageUrl } = user;
				const token = jwt.sign({
					id,
					username,
					email,
					profileImageUrl,
				}, process.env.SECRET_KEY);

				return res.status(200).json({
					id,
					username,
					email,
					profileImageUrl,
					token,
				});
			} else {
				return next({
					status: 400,
					message: 'Invalid email/password',
					code: 10000,
				});
			}
		} catch (e) {
			console.error(e);
			return next({
				status: 400,
				message: 'Invalid email/password',
				code: 10000,
			});
		}
	},

	signup: async function(req, res, next) {
		try {
			const { id, username, profileImageUrl, email } = await db.User.create(req.body);
			const token = jwt.sign(
				{
					id,
					email,
					username,
					profileImageUrl
				},
				process.env.SECRET_KEY
			);
			return res.status(200).json({
				id,
				email,
				username,
				profileImageUrl,
				token
			});
		} catch (e) {
			if (e.code === 11000) {
				e.message = "Sorry, that username and/or email is already taken.";
			}
			return next({
				status: 400,
				message: e.message,
				code: e.code
			});
		}
	}
};
