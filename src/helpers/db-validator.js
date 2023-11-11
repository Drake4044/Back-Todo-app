const Role = require("../models/role")
const User = require("../models/userMg")


const validatorRole = async( rol = "" ) => { // validacion de rol segun la DB
    const existRole = await Role.findOne({ rol })
    if ( !existRole ) {
        throw new Error(`El rol ${ rol } no esta en la DB`)
    }
}


const validateMail = async( mail = "" ) => { // validacion si existe el Mail en la DB
    const findMail = await User.findOne({ mail })
        if( findMail ) {
            throw new Error(`El mail: ${ mail } ya existe en la DB`)
        }
}

module.exports = {
    validatorRole,
    validateMail
}