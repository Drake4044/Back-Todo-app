const { Router } = require("express")
const { Todo } = require("../db")
const { Op } = require("sequelize")

const router = Router()

router.get("/", async (req,res) => {
    try {
        const todos = await Todo.findAll()
        res.status(200).send(todos)
    } catch (error) {
        console.log(error.message);
    }
})


router.get("/:id", async (req,res) => {

    const { id } = req.params

    if(id) {
        try {
            const userTodos = await Todo.findAll({
                where: {
                    UserId: id
                }
            })
            res.status(200).send(userTodos)
        } catch (error) {
            console.log(error.message);
        }
    }
})

router.post("/", async (req,res) => {
    try {
        const { userId, task, complete } = req.body
        const findTodo = await Todo.findOne({ where: { task: { [Op.iLike]: task }, UserId: userId }})
            if(!findTodo) {
                const newTodo = await Todo.create({ task, complete })
                newTodo.setUser(userId)
                res.status(200).send(`Se agrego la tarea: "${newTodo.task}"`)
            } else {
                res.status(400).send(`Ya existe la tarea: "${task}"`)
            }
    } catch (error) {
        res.status(404).send("No se pudo agregar la tarea")
    }
})

router.put('/', async (req, res) =>{
    try {

        const { id, task } = req.body
        const completeTodo = await Todo.findOne({
            where: {
                task,
                UserId: id
            }
        })
        
        console.log(completeTodo);
        completeTodo.complete = !completeTodo.complete

        await completeTodo.save();
        res.status(200).send("Tarea completada")
    } catch (error) {
        res.status(400).send('No se puedo completar la tarea');
    }
});

router.delete ("/",  async (req,res) => {
    try {
        const { id, task } = req.body
        const deleteTodo = await Todo.findOne({
            where: {task, UserId: id}
        })
        console.log(req.body)
        await deleteTodo.destroy()
        res.status(200).send("Tarea eliminada")
    } catch (error) {
        console.log(req.body)
        res.status(400).send("Ocurrio un error")
    }
})




module.exports = router
