const { Router } = require("express")
// const { Todo } = require("../db")
// const { Op } = require("sequelize")


const router = Router()

router.get("/", async (req,res) => { // All todos en orden asencendente por id
    try {
        const todos = await Todo.findAll({
            order: [
                ['id', 'ASC'],
            ]
        })
        res.status(200).send(todos)
    } catch (error) {
        console.log(error.message);
    }
})


router.get("/:id", async (req,res) => { // todos por usuario en orden asencendente por id
    try {
        const { id } = req.params
        const userTodos = await Todo.findAll({
            where: {
                UserId: id
            },
            order: [
                ['id', 'ASC'],
            ]
        })
        res.status(200).send(userTodos)
        } catch (error) {
            console.log(error.message);
        }
    
})

router.post("/", async (req,res) => { // Agregar nueva todo (si no existe)
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
        res.status(404).send("Ocurrio un error al agregar la tarea")
    }
})

router.put('/complete', async (req, res) =>{ // ruta is complete
    try {
        const { id, task } = req.body
        const completeTodo = await Todo.findOne({
            where: {
                task,
                UserId: id
            }
        })

        completeTodo.complete = !completeTodo.complete
        await completeTodo.save();
        res.status(200).send("Tarea completada")
    } catch (error) {
        res.status(400).send('No se puedo completar la tarea');
    }
});

router.put('/edit', async (req, res) =>{ // ruta edit todo
    try {
        const { id, task } = req.body
        const editTodo = await Todo.findOne({
            where: {
                id: id
            }
        }) 
        editTodo.task = task
        await editTodo.save();
        res.status(200).send("Tarea editada")
    } catch (error) {
        res.status(400).send('No se pudo editar la tarea');
    }
});

router.delete ("/",  async (req,res) => { // delete todo
    try {
        const { id, task } = req.body
        const deleteTodo = await Todo.findOne({
            where: {task, UserId: id}
        })
        await deleteTodo.destroy()
        res.status(200).send("Tarea eliminada")
    } catch (error) {
        res.status(400).send("Ocurrio un error")
    }
})

module.exports = router
