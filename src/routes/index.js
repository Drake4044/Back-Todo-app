const { Router } = require("express")
const todosRouter = require("./todosRouter")
const userGet = require("./userGet")
const userPost = require("./userPost")
const userPut = require("./userPut") // funcion
const userDelete = require("./userDelete")
const { check } = require("express-validator") // middleware validator   
const { validatorCampos } = require("../middlewares/validator")
const { validatorRole, validateMail, validateId } = require("../helpers/db-validator")

const router = Router()

// TODOS
router.use("/todos", todosRouter)

// USER
router.use("/users", userGet) // GET
router.put("/users/:id",[ // PUT
    check("id", "No es un ID valido de Mongo").isMongoId(),
    check("id").custom( validateId ), // valida si existe un user con ese "id"
    validatorCampos
], userPut) 
router.use("/users", userDelete) // DELETE
router.use("/users", [ // POST
    check("name", "El nombre es obligatorio").not().isEmpty(), // validando name 
    check("mail", "El correo no es valido").isEmail(), // validando mail 
    check("mail").custom( validateMail ),   // valida si existe el mail en la DB
    check("password", "El password es obligatioro").not().isEmpty(), // validando password 
    check("rol").custom( validatorRole ),  // valida el rol segun la DB
    validatorCampos
], userPost)

module.exports = router
