require("colors")
const server = require("./src/app")
const { dbConecction } = require("./src/dbMongo/config.js") 

const port = process.env.POTH || 3001


conectarDB = async () => {
    await dbConecction()
    server.listen(port, () => {
        console.log(`El servidor esta ${"funcionando".green.bold} en el puerto ${port}`);
    })
}

conectarDB()


module.exports = server