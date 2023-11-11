const { Router } = require("express")
const User = require("../models/userMg")
const bcryptjs = require("bcryptjs")

const router = Router() 

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
        const { name, mail, password, user, rol, } = req.body
        
        const userMg = new User( { name, mail, password, user, rol, } )

        const salt = bcryptjs.genSaltSync() // criptar el password
        userMg.password = bcryptjs.hashSync( password, salt )

        await userMg.save()
        
        res.status(200).send(userMg)
        
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router