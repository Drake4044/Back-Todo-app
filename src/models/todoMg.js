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

module.exports = model( "Todo", TodoSchema )