const server = require("./src/app")
const { dataBase } = require("./src/db")

const port = process.env.POTH || 3001
const syncOptions = {
    force: false, 
    alter: true
}

dataBase.sync(syncOptions).then( () => {
    server.listen(port, () => {
        console.log(`El servidor esta funcionando en el puerto ${port}`);
    })
})


module.exports = server