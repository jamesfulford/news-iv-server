const db = require('../models');

exports.createMessage = async function (req, res, next) {
	try {
		const message = await db.Message.create({
			text: req.body.text,
			user: req.params.userId,
		});
		const foundUser = await db.User.findById(req.params.userId);
		foundUser.messages.push(message);
		await foundUser.save();
		const foundMessage = await db.Message.findById(message._id).populate("user", {
			username: true,
			profileImageUrl: true,
		});
		return res.status(200).json(foundMessage);
	} catch (err) {
		next(err);
	}
}
exports.getMessage = async function (req, res, next) {
	try {
		const message = await db.Message.findById(req.params.messageId);
		return res.status(200).json(message);
	} catch (e) {
		next(e);
	}
}
exports.deleteMessage = async function (req, res, next) {
	try {
		const message = await db.Message.findById(req.params.messageId);
		if (message.user.equals(req.params.userId)) {
			await message.remove();
			return res.status(200).json(message);
		}
		return next({
			status: 401,
			message: "Unauthorized",
			code: 9000
		});
	} catch (e) {
		next(e);
	}
}
