const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Answer', new Schema({
  answer: String,
  user: String,
  timestamp: String,
  comment: String
}));