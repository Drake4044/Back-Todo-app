// require('dotenv').config();
// // import dot from "dotenv
// // const { Sequelize } = require("sequelize");
// // const TodoModel = require('./models/todo');
// // const UserModel = require('./models/User');
// // import { Sequelize } from "sequelize"
// // import TodoModel from "./models/Todo.js"
// // import UserModel from "./models/User.js"

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;


// // export const dataBase = new Sequelize( `postgres://database_todo_app_user:CFGXOOcNBmj2uJurvSyA940Qp5eJPf0N@dpg-ckk8qpbj89us739sbvj0-a.oregon-postgres.render.com/database_todo_app` , {
// //   logging: false,
// //   native: false, 
// // })

// TodoModel(dataBase)
// UserModel(dataBase)
// const { Todo, User } = dataBase.models


// User.hasMany(Todo)
// Todo.belongsTo(User)

// module.exports = {
//   dataBase,
//   ...dataBase.models
// } 