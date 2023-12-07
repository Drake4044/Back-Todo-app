const User = require("../models/userMg")

const userGet = async (req,res) => { // todos los users
    try {   

        const { limite = 5, desde = 0 } = req.query
        const query = { state: true } 

        const [ total, usuarios ] = await Promise.all([ // ejecuta ambas simultaneamente gurda en orden de variantes por promesa resuelta
            User.countDocuments( query ), // promesa 1
            User.find( query ) // promesa 2 busca todos los user
                .skip( desde ) // crea query saltea degun el query
                .limit( limite ) // crea query limita segun el query
        ])

        res.status(200).send({
            total, // promesa destructurada resuelta 1
            usuarios // promesa destructurada resuelta 2
        })
    } catch (error) {
        res.status(404).send("algo anda mal")
    }
}

const userById = async (req,res) => { // user por id
    try {
        const { id } = req.params
        
        const user = await User.findOne({ _id: id })

        res.status(200).send( user )  
    } catch (error) {
        res.status(400).send("Usuario inexistente")
    }
}

module.exports = {
    userGet,
    userById
}