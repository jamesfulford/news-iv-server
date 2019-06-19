function errorHandler(error, request, response, next) {
	return response.status(error.status || 500).json({
		error: {
			// human-readable error message
			message: error.message || "Something went wrong.",
			// machine-readable error code
			code: error.code || 0
		},
	});
}

module.exports = { default: errorHandler };
