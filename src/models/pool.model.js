const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Pool', new Schema({
  title: String,
  theme: String,
  users: Array,
  options: Array,
  active: Boolean,
  question: String,
  createdAt: String
}));