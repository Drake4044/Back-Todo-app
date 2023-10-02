// const { Router } = require("express")
// const todosRouter = require("./todosRouter")
// const userRouter = require("./userRouter")
import { Router } from "express"
import todosRouter from "./todosRouter.js"
import userRouter from "./userRouter.js"



const router = Router()

router.use("/todos", todosRouter)
router.use("/users", userRouter)

// module.exports = router
export default router