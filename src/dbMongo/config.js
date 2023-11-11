const mongoose = require("mongoose")
require('dotenv').config();
require("colors")


const { MONGO_CONECT } = process.env


const dbConecction = async() => {

    try {

        await mongoose.connect( MONGO_CONECT , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } )

        console.log(`base de datos ${"online".green.bold}`);
        
    } catch (error) {
        console.log(error);
        throw new Error(`${"Error".red.bold} al iniciar la base de datos`)
    }


}

module.exports = {
    dbConecction
}