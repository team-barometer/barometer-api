const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoolModel = require('./pool.model');

  module.exports = mongoose.model('Group', new Schema({
  title: String,
  users: Array,
  pools: Array,
  createdAt: String
}));