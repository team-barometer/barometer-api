const PollModel = require('../models/poll.model');
const QuestionModel = require('../models/question.model');

const PollService = {
  create: createPoll,
  addQuestion: addQuestionToPoll
};

function createPoll(req, res) {
  if (!req.body.creatorEmail) {
    return res.json({error: true, field: 'creatorEmail', message: 'Please provide your email'});
  }

  if (!req.body.pollTitle) {
    return res.json({error: true, field: 'pollTitle',  message: 'Please provide poll title'});
  }

  if (!req.body.theme) {
    return res.json({error: true, field: 'theme', message: 'Please provide poll theme'});
  }

  let pollModel = new PollModel({
    title: req.body.pollTitle,
    questions: [],
    users: [],
    theme: req.body.theme,
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
  if (!req.body.pollId) {
    return res.json({error: true, field: 'pollId', message: 'Please provide poll ID'});
  }

  if (!req.body.questionTtile) {
    return res.json({error: true, field: 'questionTtile', message: 'Please provide question name'});
  }

  let questionModel = new QuestionModel({
    title: req.body.questionTtile,
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