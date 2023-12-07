const User = require("../models/userMg")
const bcryptjs = require("bcryptjs")

const userPut = async(req,res) => { // editar user
        
        try {
                const { id } = req.params
        
                const { _id, google, ...user  } = req.body /* extraigo lo que no quiero modificar
                                                                    si es que viene en el body */
                if( user.password )  {
                        const salt = bcryptjs.genSaltSync() // criptar el password
                        user.password = bcryptjs.hashSync( user.password, salt )   
                }                    
                const editUser = await User.findByIdAndUpdate( id, user )
        
                res.status(200).send({
                        user: user,
                        msg: "Usuario editado"
                })
                
        } catch (error) {
                res.status(400).json(error)
        }
}

const userState = async(req,res) => {

        try {

            const { id, state } = req.body
            
            const user = await User.findByIdAndUpdate( id, { state: !state })

            res.status(200).json({
                msg: `Se cambio el estado a ${!state} `
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: "Comuniquese con el Administrador"
            })
        }

}


module.exports = {
    userPut,
    userState
}