const express = require("express")
const router = express.Router()

module.exports = function (redisClient) {

	router.get("/", function (req, res, next) {
		var number = parseInt(req.query["number"])

		if (!number && (typeof number != "number")) {
			return next()
		}

		redisClient.get(number, function (error, response) {
			if (error) {
				next(error)
			}
			else {
				res.render("get", {
					number: response || 0
				})
			}
		})

	})

	return router
}