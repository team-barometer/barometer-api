const express = require('express');
const router = express.Router();

const PollService = require('../services/poll.service');

/**
 * Params
 * creatorEmail, pollTitle, theme(optional)
 */
router.post('/create', (req, res) => {
  PollService.create(req, res);
});

/**
 * Params
 * pollId, questionTitle
 */
router.post('/add/question', (req, res) => {
  PollService.addQuestion(req, res);
});

module.exports = router;