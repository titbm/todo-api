var express = require('express');
var server = express();
const PORT = process.env.PORT || 3000;

server.get('/', function(request, response){
  response.send('Todo Api Root');
});

server.listen (PORT, function() {
  console.log('Server started on port ' + PORT);
});
