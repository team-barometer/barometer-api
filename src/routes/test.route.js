const express = require('express');
const router = express.Router();

const TestService = require('../services/test.service');

router.get('/', (req, res) => {
  res.json({test: 'test'});
});

router.post('/save', (req, res) => {
  TestService.test(req, res)
});

router.get('/all', (req, res) => {
  TestService.getAllTests(res)
});

router.get('/one/:id', (req, res) => {
  TestService.getOneTest(req, res)
});

module.exports = router;