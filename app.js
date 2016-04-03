'use strict';

const Http = require('http');
const Path = require('path');
const Express = require('express');
const BodyParser = require('body-parser');
const Logger = require('morgan');
const Mongoose = require('mongoose');

const Book = require('./databases/').model;

const publicPath = Path.join(__dirname, 'app/public');
const viewsPath = Path.join(__dirname, 'app/views');

const app = Express();

var mongoURI = "mongodb://localhost:27017/share-books";
var MongoDB = Mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

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
  const query = req.query.q.toLowerCase();

  Book
    .find({ $text: { $search: query } })
    .exec((error, bs) => {
      if (error) return res.render('error', { error });
      res.render('search', { search: query, books: bs });
    });
});

app.get('/books/', (req, res) => {
  res.redirect('/');
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;

  Book
    .findOne({ _id: id })
    .exec((error, b) => {
      if (error) return res.render('error', { error });
      res.render('book', { book: b });
    });
});

module.exports = app;
