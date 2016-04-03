'use strict';

const Path = require('path');
const Express = require('express');

const publicPath = Path.join(__dirname, 'app/public');
const viewsPath = Path.join(__dirname, 'app/views');

const app = Express();

app.set('view engine', 'jade');
app.set('views', viewsPath);
app.use(Express.static(publicPath));

app.get('/', function (req, res) {
  res.render('home', {
    name: 'hola mundo'
  });
});

module.exports = app;
