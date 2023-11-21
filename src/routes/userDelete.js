const User = require("../models/userMg")


const userDelete = async(req,res) => { // eliminar user 
    try {
        const { id } = req.params

        const userId = await User.findById( id ) // Flag
        
        const user = await User.findByIdAndUpdate( id, { state: !userId.state } )

        res.status(200).json({
            user,
            msg: "Usuario eliminado"
        })

    } catch (error) {

        res.status(404).send("No se pudo eliminar el usuario")
    }
}

module.exports = userDelete