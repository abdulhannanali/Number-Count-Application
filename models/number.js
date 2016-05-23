module.exports = function (client) {
	if (!client) {
		throw new Error("client not provided to redis")
	}

	function getNumber (number, cb) {
		client.get(number, cb)
	}

	function increaseNumber (number, cb) {
		client.incr(number, cb)
	}

	return {
		getNumber: getNumber,
		increaseNumber: increaseNumber
	}
}