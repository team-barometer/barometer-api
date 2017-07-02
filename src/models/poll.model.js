const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Pool', new Schema({
  title: String,
  questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
  users: Array,
  theme: String,
  options: Array,
  isAnonymous: Boolean,
  isActive: Boolean,
  creator: String,
  createdAt: String
}));