const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
	signin: function() {},

	signup: async function(req, res, next) {
		try {
			const { id, username, profileImageUrl } = await db.User.create(req.body);
			const token = jwt.sign(
				{
					id,
					username,
					profileImageUrl
				},
				process.env.SECRET_KEY
			);
			return res.status(200).json({
				id,
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
