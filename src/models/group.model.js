const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PoolModel = require('./poll.model');

module.exports = mongoose.model('Group', new Schema({
  title: String,
  users: Array,
  pools: Array,
  createdAt: String
}));