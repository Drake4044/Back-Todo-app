const jwt = require("jsonwebtoken")
const User = require("../models/userMg")

const validarJwt = async( req, res, next ) => { 

        const token = req.header("x-token") 

        if( !token ) {  // si no mandamos el token devuelve null
            return res.status(401).json({
                msg: "No hay token en la peticion"
            })
        }
    
    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY ) // verifica con la firma y devuelve los datos del token

        const usuario = await User.findById( uid )

        if( !usuario ) {
            return res.status(401).json({
                msg: "Token no valido - Usuario no existe en la DB"
            })
        }

        if( !usuario.state ) { // verifica si el usuario tiene como state = false "usuario eliminado" (borrador logico)
            return res.status(401).json({
                msg: "Token no valido - Usuario: state false"
            })
        }

        req.usuario = usuario
        
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({  
            msg: "Token no valido"
        })
    }

}

module.exports = validarJwt