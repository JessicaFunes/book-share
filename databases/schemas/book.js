'use strict';

const Mongoose = require('mongoose');

const BookSchema = Mongoose.Schema({
  name: String,
  Author: String,
  seller: {
    name: String,
    price: Number,
    url: String
  }
});

module.exports = BookSchema;
