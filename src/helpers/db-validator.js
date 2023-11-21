const Role = require("../models/roleMgjs")
const User = require("../models/userMg")
const Todo = require("../models/todoMg")


const validatorRole = async( rol = "" ) => { // validacion de rol segun la DB
    const existRole = await Role.findOne({ rol })
    if ( !existRole ) {
        throw new Error(`El ${ rol } no es un rol valido en la DB`)
    }
}

const validateMail = async( mail = "" ) => { // validacion si existe el Mail en la DB
    const findMail = await User.findOne({ mail })
        if( findMail ) {
            throw new Error(`El mail: ${ mail } ya existe en la DB`)
        }
}

const validateId = async( id ) => { // valida si existe un usuario con ese "id" en la DB
    const findIdUser = await User.findById( id )
        if( !findIdUser ) {
            throw new Error(`No existe un usuario con el Id: ${id} en la DB`)
        }
}


const validateUser = async( user = "" ) => { // valida si ya existe un usuario en la DB
    const findUser = await User.findOne({ user })
        if( findUser ) {
            throw new Error(`Ya existe un usuario con el user: ${user}`)
        }
}

const validateTodo = async( id ) => { // valida si ya existe un usuario en la DB
    const findTodo = await Todo.findById( id )
        if( !findTodo ) {
            throw new Error(`No existe un tarea con el id: ${id}`)
        }
}


module.exports = {
    validatorRole,
    validateMail,
    validateId,
    validateUser,
    validateTodo
}