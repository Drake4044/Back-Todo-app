const { Router } = require("express")
const User = require("../models/userMg")

const router = Router()


router.delete("/delete", async (req,res) => { // eliminar user y todas sus tareas
    try {
        const { id } = req.body
        const user = await User.findOne({
            where: { id }
        })
        
        await Todo.destroy({
            where: {
                UserId: id
            },
        })
        await user.destroy()
        res.status(200).send(`User y todos eliminados`)
    } catch (error) {

        const { id } = req.body

        const userTodos = await Todo.findAll({
            where: {
                UserId: id
            },
        })
        console.log(userTodos);
        res.status(404).send("No se pudo eliminar el usuario")
    }
})

module.exports = router