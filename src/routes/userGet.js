const { Router } = require("express")
const User = require("../models/userMg")

const router = Router()


router.get("/", async (req,res) => { // todos los users
    try {    
        const allUsers = await User.find()
        res.status(200).send(allUsers)
    } catch (error) {
        res.status(404).send("algo anda mal")
    }
})

router.get("/:_id", async (req,res) => { // user por id
    try {
        const { id } = req.params
        
        const user = await User.findOne( id )

        res.status(200).send(user)  
    } catch (error) {
        res.status(400).send("Usuario inexistente")
    }
})

module.exports = router