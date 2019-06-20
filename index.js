require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database
const db = require('./models');

// Routes
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

app.use("/api/auth", require("./routes/auth").default);
app.use("/api/users/:userId/messages", loginRequired, ensureCorrectUser, require("./routes/messages").default);

app.get('/api/messages', loginRequired, async function (req, res, next) {
	try {
		const messages = await db.Message
			.find()
			.sort({ createdAt: 'desc' })
			.populate('user', {
				username: true,
				profileImageUrl: true,
			});
		return res.status(200).json(messages);
	} catch (e) {
		next(e);
	}
});

// Error handling

app.use(function(req, res, next) {
	const err = new Error("Not found");
	err.status = 404;
	err.code = 404;
	next(err);
});

app.use(require("./handlers/error").default);

const PORT = process.env.PORT || 4242;
app.listen(PORT, console.log.bind(console, `Server started on port ${PORT}`));
