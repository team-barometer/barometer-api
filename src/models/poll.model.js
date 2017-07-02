const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Pool', new Schema({
  title: String,
  questions: Array,
  users: Array,
  theme: String,
  options: Array,
  isAnonymous: Boolean,
  isActive: Boolean,
  createdAt: String
}));