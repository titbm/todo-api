var express = require('express');
var server = express();
const PORT = process.env.PORT || 3000;

var todos =[ // Коллекция данных
  {
    id: 1, // модель данных
    description: 'Meet mom for lunch',
    completed: false
  },
  {
    id: 2, // модель данных
    description: 'Go to market',
    completed: false
  },
  {
    id: 3, // модель данных
    description: 'Feed the cat',
    completed: true
  }
];


// GET /todos
server.get('/todos', function(request, response) {
  response.json(todos); // response.json - метод Express для отправки объектов в формате json
});

// GET /todos/:id
server.get('/todos/:id', function(request, response) {
  var todoId = parseInt(request.params.id, 10); // request.params - объект с данными, которые передаются в запросе через двоеточие
  var matchedTodo = null;

  // response.send(todoId);
  todos.forEach(function(todo) {
    if (todo.id === todoId) {
      matchedTodo = todo;
    }
  });

  if (matchedTodo) {
    response.status(200).json(matchedTodo); // status(200) - отправить страницу со статусом 200 и данные в JSON-формате. status(200) - указывать необязательно
  } else {
    response.status(404).send(); // status(404) - отправить страницу со статусом 404, если адреса не существует
  }

});

server.get('/', function(request, response){
  response.send('Todo Api Root');
});

server.listen (PORT, function() {
  console.log('Server started on port ' + PORT);
});
