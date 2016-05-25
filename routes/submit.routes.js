const recaptcha = require("../lib/recaptcha")(process.env["SERVER_KEY_RECAPTCHA"])
const router = require("express").Router()
const redis = require("redis")
const bodyParser = require("body-parser")


module.exports = function (redisClient) {
	if (!redisClient) {
		throw new Error("redisClient not provided!")
	}

	const Number = require("../models/number")(redisClient)

	router.use(bodyParser.urlencoded({
		extended: true
	}))

	router.get("/", function (req, res, next) {
        res.render("submit", {title: "Submit the numberzzzz!"})
	})




	

	router.post("/", function (req, res, next) {
		if (!(req.body && req.body.number && req.body["g-recaptcha-response"])) {
			return next()
		}

		var captchaResponse = req.body["g-recaptcha-response"]
		var number = parseInt(req.body["number"])

		if (captchaResponse && number) {
			recaptcha.siteVerify(captchaResponse, undefined, function (error, response) {
				if (error) {
					return next(error)
				}
				else if (response && response.success && number) {
					Number.increaseNumber(number, function (error, response) {
						if (error) {
							next(error)
						}
						else if (response) {
							res.render("number", {
								number: number,
								times: response
							})
						}
					})
				}
			})
		}
 	})	


	return router
}


