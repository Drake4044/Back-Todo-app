const Todo = require("../models/todoMg")

const todosDelete = async(req,res) => { // delete todo
    try {
        const { id } = req.params

        const deleteTodo = await Todo.findByIdAndDelete( id ) 

        res.status(200).json({
            deleteTodo,
            msg: "Tarea eliminada",
        })
    } catch (error) {
        res.status(400).send("Ocurrio un error")
    }
}

module.exports = todosDelete