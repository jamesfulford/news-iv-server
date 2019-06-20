const mongoose = require('mongoose');
const User = require('./user').default;

const messageSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		maxLength: 255,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

messageSchema.pre('remove', async function (next) {
	try {
		const user = await User.findById(this.user);
		user.messages.remove(this.id);
		await user.save();
		return next();
	} catch (e) {
		return next(e);
	}
});

const Message = mongoose.model('Message', messageSchema);
module.exports = { default: Message };
