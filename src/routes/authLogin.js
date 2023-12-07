const { Router } = require("express")
const bcryptjs = require("bcryptjs")

const User = require("../models/userMg")
const jwtGen = require("../helpers/jwtGen")

const router = Router()

router.post("/login", async(req, res) => {
    try {
        
        const { mail, password } = req.body

        const user = await User.findOne({ mail })
        // validamos que exista un user con ese mail
        if( !user ) {
            return res.status(400).json({
                msg: "Usuario y/o el Password son incorrectos"
            })
        }

        // validamos si el usuario esta activo 
        if( !user.state ) {
            return res.status(401).json({
                msg: "Usuario y/o el Password son incorrectos, state: false"
            })
        }

        // validamos si el password coincide con la db
        const validPassword = bcryptjs.compareSync( password, user.password )
        if( !validPassword ) {
            return res.status(400).json({
                msg: "Usuario y/o el Password son incorrectos, password"
            })
        }

        // generamos token
        const token = await jwtGen( user.id )


    
        res.status(200).json({
            msg: "Login Ok",
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Comuniquese con el Administrador"
        })
    }

}) 



module.exports = router