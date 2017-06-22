const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Pool', new Schema({
  title: String,
  users: Array,
  active: Boolean,
  question: String,
  createdAt: String
}));