const mongoose = require("mongoose");

const connection =
	process.env.NEWSIV_MONGO_CONNECTION_STRING || "mongodb://localhost/news-iv";

mongoose.set("debug", !process.env.NEWSIV_MONGO_CONNECTION_STRING);
mongoose.Promise = Promise;

mongoose.connect(connection, {
	keepAlive: true,
	useMongoClient: true
});
