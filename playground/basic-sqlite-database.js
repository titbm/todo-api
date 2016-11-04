var Sequelize = require('sequelize');
var base = new Sequelize(undefined, undefined, undefined, {
  'dialect': 'sqlite', // указание на то, какой типы базы данных будет использован
  'storage': __dirname + '/basic-sqlite-database.sqlite' // файл, в котором будет база данных
});

var Todo = base.define('todo', { // create table if not exists 'todo'...
  description: {
      type: Sequelize.STRING,
      allowNull: false, // not null
      validate: {
        len: [1, 250] // 1<=length<=250
      }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false, // not null
    defaultValue: false // default
  }
});

base.sync({ force: true }).then( // { force: true } - загрузить все объявленные модели данных (таблицы) (Drop Tables + Create Table...), без использования объекта - загрузить все модели, которые еще не в базе данных
  function() {
    console.log('Everything is synced');
    Todo.create ({ // insert into 'todo' (...'description', 'completed'...) values (...'Walk my dog', 0)...
      description: 'Walk my dog',
      completed: false
    })
    .then(function(todo){
        console.log('Insert OK');
    })
    .catch(function(e){
      console.log(e);
    });
  }
);
