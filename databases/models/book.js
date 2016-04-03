'use strict';

const Mongoose = require('mongoose');
const BookSchema = require('../schemas/book');

const BookModel = Mongoose.model('books', BookSchema);

module.exports = BookModel;
