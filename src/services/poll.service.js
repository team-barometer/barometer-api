const PollModel = require('../models/poll.model');
const QuestionModel = require('../models/question.model');
const RequestHelper = require('../helpers/request.helper');

const createPollRequiredFields = [
  {field: 'creatorEmail', message: 'Please provide your email'},
  {field: 'pollTitle', message: 'Please provide poll title'}
];

const addQuestionToPollRequiredFields = [
  {field: 'pollId', message: 'Please provide poll ID'},
  {field: 'questionTitle', message: 'Please provide question name'}
];

const PollService = {
  create: createPoll,
  addQuestion: addQuestionToPoll
};

function createPoll(req, res) {

  let errors = RequestHelper.validateRequiredFields(req, createPollRequiredFields);

  if (errors.length){
    return res.json(errors);
  }

  let pollModel = new PollModel({
    title: req.body.pollTitle,
    questions: [],
    users: [],
    theme: req.body.theme ? req.body.theme : 'default',
    options: [],
    isAnonymous: false,
    isActive: false,
    creator: req.body.creatorEmail,
    createdAt: new Date().getTime()
  });

  pollModel.save((err) => {
    if (err) {
      return res.json({error: true, message: 'Poll cannot be created for mysterious reasons'});
    }
    res.json({success: true, message: 'Poll created'});
  })
}

function addQuestionToPoll(req, res) {
  let errors = RequestHelper.validateRequiredFields(req, addQuestionToPollRequiredFields);

  if (errors.length){
    return res.json(errors);
  }

  let questionModel = new QuestionModel({
    title: req.body.questionTitle,
    answers: []
  });

  questionModel.save((err, question) => {
    if (err) {
      return res.json({error: true, message: 'Question cannot be created for mysterious reasons'});
    }

    PollModel.findById(req.body.pollId, (err, poll) => {
      poll.questions.push(question._id);

      poll.save((err, poll) => {
        if (err) {
          return res.json({error: true, message: 'Question cannot be updated for mysterious reasons'});
        }
        res.json({success: true, message: 'Question added'});
      })
    })
  });
}

module.exports = PollService;