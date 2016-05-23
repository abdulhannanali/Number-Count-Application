const request = require("request")
const colors = require("colors")

module.exports = function (serverSecret) {
	var verifyEndpoint = "https://www.google.com/recaptcha/api/siteverify"

	if (serverSecret && serverSecret.trim()) {
		console.log("Recaptcha module initiated with serverSecret = " .america , serverSecret .rainbow)
	} 
	else if (!serverSecret) {
		throw new Error("serverSecret for recaptcha is not provided")
	}
	

	function siteVerify (response, remoteIp, callback) {
		if (!response) {
			return callback(new Error("captcha response not provided"))
		}

		var formData = {
			secret: serverSecret,
			response: response
		}


		if (remoteIp) {
			formData["remoteip"] = remoteIp
		}
		
		request({
			url: "https://www.google.com/recaptcha/api/siteverify",
			method: "post",
			formData: formData
		}, function (error, response, body) {
			if (error) {
				return callback(error)
			}
			else if (response.body) {
				return callback(undefined, JSON.parse(response.body))
			}
			else {
				cb(new Error("No response provided in recaptcha.js"))
			}
		})
	}

	return {
		siteVerify: siteVerify
	}
}