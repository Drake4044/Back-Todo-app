const Todo = require("../models/todoMg")

const todoComplete = async(req, res) =>{ // ruta is complete
    try {
        const { id } = req.params

        const todoId = await Todo.findById( id ) // Flag

        const completeTodo = await Todo.findByIdAndUpdate( id, { complete: !todoId.complete } )

        res.status(200).send({
            todo: completeTodo,
            msg: "Tarea completada"
        })

    } catch (error) {
        res.status(400).send('No se puedo completar la tarea');
    }
}

const todoEdit = async(req, res) =>{ // ruta edit todo
    try {
        const { id, task } = req.body

        const editTodo = await Todo.findByIdAndUpdate( id, { task } ) 

        res.status(200).send({
            todo: editTodo,
            msg: "Tarea editada"
        })
    } catch (error) {
        res.status(400).send('No se pudo editar la tarea');
    }
}

module.exports = {
    todoComplete,
    todoEdit
}