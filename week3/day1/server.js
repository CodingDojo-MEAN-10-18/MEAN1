const express = require('express');
const parser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();

const logger = require('./server/middleware/logger');

console.log(logger);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(parser.urlencoded({ extended: true }));
app.use(logger);
app.use(function (request, response, next) {
  console.log('next middleware');
  const error = new Error('i am an error');
  next(error);
});

const names = ['Bob', 'Nayyer', 'Jeremy'];



app.get('/', function (request, response) {

  console.log('getting to index');

  response.render('index');
});

app.post('/names', function (request, response) {
  console.log('sent to names', request.body);

  names.push(request.body.name);

  response.render('names', { name: request.body.name, names });

  // response.redirect('/');
});

app.get('/names/:name_id', function (request, response) {
  console.log('sending name', request.params);

  response.send(names[request.params.name_id]);
});


app.use(function (error, request, response, next) {
  // logging to db;
  console.log(error.message);

  next(error);
});


app.use(function (error, request, response, next) {
  response.send(error.message);
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
