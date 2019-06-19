const mongoose = require("mongoose");

const connection =
	process.env.NEWSIV_MONGO_CONNECTION_STRING || "mongodb://localhost/news-iv";

// If env is set
mongoose.set("debug", !!process.env.MONGOOSE_DEBUG);
mongoose.Promise = Promise;

mongoose.connect(connection, {
	keepAlive: true,
	useMongoClient: true
});
