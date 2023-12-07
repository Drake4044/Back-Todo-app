const Todo = require("../models/todoMg")

const todoGet = async(req,res) => { // All todos
    try {

        console.log("listando...")

        const todos = await Todo.find()

        res.status(200).send(todos)

    } catch (error) {
        console.log(error);
    }
}


const todoById = async(req,res) => { // todos por usuario en orden asencendente por id
    try {
        
        const { id } = req.params

        console.log("buscando...")

        const userTodos = await Todo.findById( id )

        res.status(200).send(userTodos)

        } catch (error) {
            console.log(error.message);
        }
    
}

module.exports = {
    todoGet,
    todoById
}