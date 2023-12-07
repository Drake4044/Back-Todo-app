const { Router } = require("express")
const { userGet, userById } = require("./userGet")
const userPost = require("./userPost")
const { userPut, userState } = require("./userPut") // funcion
const userDelete = require("./userDelete") // funcion
const { todoGet, todoById } = require("./todosGet")
const todoPost = require("./todosPost") // funcion
const todosDelete = require("./todosDelete") // funcion
const { todoComplete, todoEdit } = require("./todosPut")
const { check } = require("express-validator") // middleware validator   
const loginAuth = require("./authLogin") 

const { validatorCampos } = require("../middlewares/validator")
const validarJwt = require("../middlewares/validarJwt") // valida token

const { validatorRole, validateMail, validateId, validateUser, validateTodo } = require("../helpers/db-validator")


const router = Router()

// TODOS // mover todo esto a un solo archivo
router.get("/todos", todoGet) // GET
router.get("/todos/:id", [
    check("id", "No es un ID valido de Mongo").isMongoId(),
    check("id").custom( validateTodo ), // valida si existe un todo con ese "id"
    validatorCampos
] ,todoById) // GET
router.post("/todos", todoPost) // POST
router.delete("/todos/:id", [
    check("id", "No es un ID valido de Mongo").isMongoId(),
    check("id").custom( validateTodo ), // valida si existe un todo con ese "id"
    validatorCampos
], todosDelete) // DELETE
router.put("/todos/:id",[
    check("id", "No es un ID valido de Mongo").isMongoId(),
    check("id").custom( validateTodo ), // valida si existe un todo con ese "id"
    validatorCampos
] , todoComplete ) // PUT // complete Todo  
router.put( "/todos", todoEdit ) // PUT modificar todo


// USER // mover todo esto a un solo archivo
router.get("/users", userGet) // GET
router.get("/users/:id", [
    check("id", "No es un ID valido de Mongo").isMongoId(),
    check("id").custom( validateId ), // valida si existe un user con ese "id"
    validatorCampos
] ,userById) // GET
router.put("/users/:id",[ // PUT
    check("id", "No es un ID valido de Mongo").isMongoId(),
    check("id").custom( validateId ), // valida si existe un user con ese "id"
    check("rol").custom( validatorRole ), // puedo reutilizar validaciones
    check("mail", "El correo no es valido").isEmail(),
    validatorCampos
], userPut) 
router.put("/users", [ // User State a su opuesto
    check("id", "No es un ID valido de Mongo").isMongoId(),
    check("id").custom( validateId ),
    validatorCampos
], userState) 
router.delete("/users/:id",[
    validarJwt, // verifica si se mando el token y si es valido
    check("id", "No es un ID valido de Mongo").isMongoId(),
    check("id").custom( validateId ), // valida si existe un user con ese "id"
    validatorCampos
] ,userDelete) // DELETE
router.use("/users", [ // POST
    check("name", "El nombre es obligatorio").not().isEmpty(), // validando name 
    check("mail", "El correo no es valido").isEmail(), // validando mail 
    check("mail").custom( validateMail ),   // valida si existe el mail en la DB
    check("password", "El password es obligatioro").not().isEmpty(), // validando password 
    check("rol").custom( validatorRole ),  // valida el rol segun la DB
    check("user").custom( validateUser ),  // valida el user segun la DB
    validatorCampos
], userPost)

// AUTH // mover todo esto a un solo archivo
router.use("/auth", [ // genera un token de logeo
    check("mail", "El mail es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validatorCampos
] , loginAuth) 

module.exports = router
