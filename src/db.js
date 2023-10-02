// require('dotenv').config();
import dot from "dotenv"
dot.config()
// const { Sequelize } = require("sequelize");
// const TodoModel = require('./models/todo');
// const UserModel = require('./models/User');
import { Sequelize } from "sequelize"
import TodoModel from "./models/Todo.js"
import UserModel from "./models/User.js"

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;


export const dataBase = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost/${DB_NAME}`, {
  logging: false,
  native: false,
})

TodoModel(dataBase)
UserModel(dataBase)
export const { Todo, User } = dataBase.models


User.hasMany(Todo)
Todo.belongsTo(User)

// module.exports {
//   dataBase,
//   ...dataBase.models
// } 