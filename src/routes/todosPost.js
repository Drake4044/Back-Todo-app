const Todo = require("../models/todoMg")

const todoPost =  async(req,res) => { // Agregar nueva todo 
    try {

        const { task } = req.body

        const newTodo = new Todo({ task })

        await newTodo.save()

       res.status(200).json({
            todo: newTodo,
            msg: `Todo: '${task}' creada` 
       })
    } catch (error) {
        res.status(404).send("Ocurrio un error al agregar la tarea")
    }
}

module.exports = todoPost
