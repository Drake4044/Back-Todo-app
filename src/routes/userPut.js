const { Router } = require("express")
const User = require("../models/userMg")

const router = Router()

router.put("/edit/:id", async (req,res) => { // editar user
    try {

        const { id } = req.params

        const { password, google, ...user  } = req.body
        
        const editUser = await User.findByIdAndUpdate( id, user )

        console.log(editUser);
    
        res.status(200).send(`El Usuario fue editado`)
    } catch (error) {
        res.status(404).send("No se pudo editar el usuario")
    }
})

module.exports = router