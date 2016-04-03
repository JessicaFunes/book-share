'use strict';

const Http = require('http');
const Path = require('path');
const Express = require('express');
const BodyParser = require('body-parser');
const Logger = require('morgan');
const Qs = require('qs');

const publicPath = Path.join(__dirname, 'app/public');
const viewsPath = Path.join(__dirname, 'app/views');

const app = Express();

app.use(Logger('tiny'));
app.use(Express.static(publicPath));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.set('view engine', 'jade');
app.set('views', viewsPath);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/search', (req, res) => {
  res.render('search', { q: Qs.stringify(req.query) });
});

module.exports = app;
