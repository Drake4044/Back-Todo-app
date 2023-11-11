const express = require("express")
const morgan = require("morgan")
const router = require("../src/routes/index")
const cors = require("cors")


const server = express()

 // midlewares
server.use(morgan("dev"))
server.use(express.json())
server.use(cors())

// rutas
server.use("/", router)


module.exports = server
