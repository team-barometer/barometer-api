const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Question', new Schema({
  title: String,
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
}));