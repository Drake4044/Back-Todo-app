const { Router } = require("express")
const todosRouter = require("./todosRouter")
const userRouter = require("./userRouter")

const router = Router()

router.use("/todos", todosRouter)
router.use("/users", userRouter)

module.exports = router