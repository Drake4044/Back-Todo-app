const { Schema, model } = require("mongoose")

const UserSchema = Schema({
    name: {
        type: String,
        require: [ true, "El 'name' es obligatorio" ],
    },
    mail: {
        type: String,
        require: [ true, "El 'mail' es obligatorio" ],
        unique: true
    },
    password: {
        type: String,
        require: [ true, "El 'password' es obligatorio" ]
    },
    user: {
        type: String,
        require : [ true, "El 'user' es obligatorio " ],
        unique: true // Crear validacion
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

UserSchema.methods.toJSON = function() {
    const {  __v, password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}

module.exports = model( "User", UserSchema )