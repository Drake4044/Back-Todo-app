// const { DataTypes } = require("sequelize")
import { DataTypes } from "sequelize"

const Todo = (database) => {
    database.define("Todo", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false
        },
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{timestamps : false})  
}

// module.exports = Todo
export default Todo