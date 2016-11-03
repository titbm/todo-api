var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var server = express();
const PORT = process.env.PORT || 3000;

var todos = []; // коллекция данных
var todoNextId = 1;


server.use(bodyParser.json()); // middleware - для обработки данных, присланных в формате JSON

// GET /todos - GET-запросы используются для получения данных
server.get('/todos', function(request, response) {
  response.json(todos); // response.json - метод Express для отправки объектов в формате json
});

// GET /todos/:id
server.get('/todos/:id', function(request, response) {
  var todoId = parseInt(request.params.id, 10); // request.params - объект с данными, которые передаются в запросе через двоеточие
  var matchedTodo = _.findWhere(todos, { id: todoId }); // underscore-функция для поиска модели в коллекции todos элемента с id = totoId

  if (matchedTodo) {
    response.status(200).json(matchedTodo); // status(200) - отправить страницу со статусом 200 и данные в JSON-формате. status(200) - указывать необязательно
  } else {
    response.status(404).send(); // status(404) - отправить страницу со статусом 404, если адреса не существует
  }
});

// POST /todos - POST-запросы используются для передачи данных.
// При выполнении POST-запроса данные записываются в заголовок запроса, а не в URL.
// Такой метод безопанее, чем GET-запрос и позволяет передавать сложные данные, такие как файл или JSON (данный случай)

server.post('/todos', function(request, response){
  var body = _.pick(request.body, 'description', 'completed'); // .pick - фильтрует свойства в объекте (чтобы не передавали лишнее), в request.body содержаться данные обработанные body-parser.json()

  if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
    return response.status(404).send();
  }

  body.description = body.description.trim();
  body.id = todoNextId++;
  todos.push(body);

  response.json(body);
});

server.get('/', function(request, response){
  response.send('Todo Api Root');
});

server.listen (PORT, function() {
  console.log('Server started on port ' + PORT);
});
