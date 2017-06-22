const express = require('express');
const router = express.Router();

const UserService = require('../services/user.service');

router.get('/test', (req, res) => {
  res.send("qq");
});

router.post('/save', (req, res) => {
  UserService.save(req, res);
});

module.exports = router;