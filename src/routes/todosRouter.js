const { Router } = require("express")
const { Todo } = require("../db")

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
        const newTodo = await Todo.create({ task, complete })
        newTodo.setUser(userId)
        res.status(200).send(`Se agrego la tarea: "${newTodo.task}"`)
    } catch (error) {
        res.status(400).send("algo anda mal")
    }
})

module.exports = router
