const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use routes here

app.use(function(req, res, next) {
	const err = new Error("Not found");
	err.status = 404;
	next(err);
});

app.use(require("./handlers/error").default);

const PORT = process.env.PORT || 4242;
app.listen(PORT, console.log.bind(console, `Server started on port ${PORT}`));
