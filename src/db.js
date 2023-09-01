require('dotenv').config();
const { Sequelize } = require("sequelize");
const TodoModel = require('./models/todo');
const UserModel = require('./models/User');

const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME } = process.env;


const dataBase = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
  native: false,
})

TodoModel(dataBase)
UserModel(dataBase)
const { Todo, User } = dataBase.models

User.hasMany(Todo)
Todo.belongsTo(User)

module.exports = {
  dataBase,
  ...dataBase.models
} 