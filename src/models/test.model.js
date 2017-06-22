const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Test', new Schema({
  message: String,
  type: String,
  timeStamp: String
}));