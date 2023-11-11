const User = require("../models/userMg")

const userPut = async(req,res) => { // editar user
    
        const { id } = req.params

        const { _id, password, google, ...user  } = req.body /* extraigo lo que no quiero modificar
                                                            si es que viene en el body */                                     
        const editUser = await User.findByIdAndUpdate( id, user )

        res.status(200).send(`El Usuario fue editado`)
}

module.exports = userPut