const express = require('express');
const router = express.Router();

const GroupService = require('../services/group.service');

router.get('/pools', (req, res) => {
  GroupService.getPools(req, res)
});

router.post('/vote', (req, res) => {
  GroupService.updateUserAnswer(req, res);
});

router.post('/save', (req, res) => {
  GroupService.save(req, res);
});

router.post('/poll/add', (req, res) => {
  GroupService.addPollToGroup(req, res);
});

router.get('/:title', (req, res) => {
  GroupService.getGroupByName(req, res);
});

router.get('/user/:email', (req, res) => {
  GroupService.getGroupByUserEmail(req, res);
});

router.get('/user/pool/:email', (req, res) => {
  GroupService.getGroupPollByUserEmail(req, res);
});

router.post('/save', (req, res) => {
  GroupService.save(req, res);
});

router.post('/add', (req, res) => {
  GroupService.addPollToGroup(req, res);
});

router.post('/vote', (req, res) => {
  GroupService.updateUserAnswer(req, res);
});

module.exports = router;