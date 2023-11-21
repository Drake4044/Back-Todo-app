const { Schema, model } = require("mongoose")

const TodoSchema = Schema({
    task: {
        type: String,
        require: [ true, "La tarea es obligatoria"]
    },
    complete: {
        type: Boolean,
        default: false
    }
})

TodoSchema.methods.toJSON = function() { // metodo que convierte en objeto el schema
    const {  __v, ...todo } = this.toObject() // destructurando lo que quiero mostrar
    return todo
}

module.exports = model( "Todo", TodoSchema )