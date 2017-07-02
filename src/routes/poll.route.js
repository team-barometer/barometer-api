const express = require('express');
const router = express.Router();

const PollService = require('../services/poll.service');

router.post('/create', (req, res) => {
  PollService.create(req, res);
});

router.post('/add/question', (req, res) => {
  PollService.addQuestion(req, res);
});

module.exports = router;