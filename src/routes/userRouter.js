const { Router } = require("express")
const { User } = require("../db")
const { Op } = require("sequelize");

const router = Router()


router.get("/", async (req,res) => { // todos los users
    try {    
        const allUsers = await User.findAll()
        res.status(200).send(allUsers)
    } catch (error) {
        res.status(404).send("algo anda mal")
    }
})

router.get("/:id", async (req,res) => { // user por id
    try {
        const { id } = req.params

        const user = await User.findOne({ where: { id } })
        const sendUser = {
            id: user.id, 
            name: user.name, 
            user: user.user, 
            mail: user.mail
        }
        user 
        ?  res.status(200).send(sendUser)
        :  res.status(400).send(`No se encuenta el usuario con el id: ${id}`)
        
    } catch (error) {
        res.status(404).send("algo anda mal")
    }
})

router.post("/login", async (req,res) => { // logeo
    try {
        const { mail, password } = req.body 
        const findUser = await User.findOne({ where: { mail, password } })

        if(findUser) {
            res.status(200).send(findUser)
        } else if(!findUser){
            res.status(400).send("Ocurrio un error con el mail o la contraseña")
        }
    } catch (error) {
        res.status(404).send("algo anda mal")
    }
})


router.post("/", async (req,res) => { // ruta crea un usuario o si ya existe por Usuario y/o mail
    try {
        const { name, user, mail, password } = req.body
        const findUser = await User.findOne({ where: { user: { [Op.iLike]: user }}})
        const findMail = await User.findOne({ where: { mail }})

        if((!findUser && !findMail) && (mail != "" && password != "" && user != "")) {
            const newUser = await User.create({ name, user, mail, password })
            res.status(200).send(newUser)
        } else if(findUser){
            res.status(400).send(`Ya existe un usuario registrado con el User: ${user}`)
        } else if(findMail){
            res.status(400).send(`Ya existe un usuario registrado con el Mail: ${mail}`)
        } else {
            res.status(400).send("Faltan datos")
        }
        
    } catch (error) {
        res.status(404).send("algo anda mal")
    }
})


router.delete("/", async (req,res) => { // eliminar user
    try {
        const { id } = req.body
        const user = await User.findOne({
            where: { id }
        })
        await user.destroy()
        res.status(200).send(`User fue eliminado`)
    } catch (error) {
        res.status(404).send("No se pudo eliminar el usuario")
    }
})

module.exports = router