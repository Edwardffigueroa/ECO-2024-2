const express = require("express")
const cors = require("cors")

const app = express() // Creates HTTP server
app.use(express.json()) // utility to process JSON in requests
app.use(cors()) // utility to allow clients to make requests from other hosts or ips

const playersRouter = require("./routes/players")

app.use("/players", playersRouter)

module.exports = app
