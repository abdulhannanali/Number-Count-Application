const router = require("express").Router()


module.exports = function (redisClient) {
    router.get("/", function (req, res, next) {
    	res.render("index", {
    		title: "Count the numberzzz!"
    	})
    })
    
    return router
}