var sequelize = require('sequelize');
var dataBaseManager = new sequelize(undefined, undefined, undefined, {
  'dialect': 'sqlite', // указание на то, какой типы базы данных будет использован
  'storage': __dirname + '/data/dev-todo-api.sqlite' // файл, в котором будет база данных
});

var db = {}; // create database...

db.todo = dataBaseManager.import(__dirname + '/models/todo.js');
db.dataBaseManager = dataBaseManager;
db.sequelize = sequelize;

module.exports = db;
