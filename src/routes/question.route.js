const express = require('express');
const router = express.Router();

const QuestionService = require('../services/question.service');

router.post('/vote', (req, res) => {
  QuestionService.vote(req, res);
});

module.exports = router;