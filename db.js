var sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var dataBaseManager = null;

if (env === 'production') {
  var dataBaseManager = new sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
  });
} else {
  var dataBaseManager = new sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite', // указание на то, какой типы базы данных будет использован
    'storage': __dirname + '/data/dev-todo-api.sqlite' // файл, в котором будет база данных
  });
}

var db = {}; // create database...

db.todo = dataBaseManager.import(__dirname + '/models/todo.js');
db.dataBaseManager = dataBaseManager;
db.sequelize = sequelize;

module.exports = db;
