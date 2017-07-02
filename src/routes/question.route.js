const express = require('express');
const router = express.Router();

const QuestionService = require('../services/question.service');

/**
 * Params
 * userEmail, questionId, answer
 */
router.post('/vote', (req, res) => {
  QuestionService.vote(req, res);
});

module.exports = router;