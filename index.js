const express = require("express")
const redis = require("redis")
const colors = require("colors")
const path = require("path")

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "0.0.0.0"

const redisClient = redis.createClient()
const app = express()

const NODE_ENV = process.env.NODE_ENV || "development"

redisClient.on("error", function (error) {
    throw error
    process.exit(1)
})

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

if (NODE_ENV == "development") {
	require("./config/keys")
}
else {

}

const indexRoute = require("./routes/index.routes")(redisClient)
const submitRoute = require("./routes/submit.routes")(redisClient)

app.use("/", indexRoute)
app.use("/submitNumber", submitRoute)

app.listen(PORT, HOST, function (error) {
    if (error) {
        console.log(`Error occured while listening` .red)
        console.error(error)
    }
    else {
        console.log(`Server is listening on \nPORT: ${PORT}\nHOST:${HOST}` .green)
    }
})