const QuestionModel = require('../models/question.model');
const AnswerModel = require('../models/answer.model');
const RequestHelper = require('../helpers/request.helper');

const voteRequiredFields = [
  {field: 'userEmail', message: 'Please provide voter email'},
  {field: 'questionId', message: 'Please provide question ID'},
  {field: 'answer', message: 'Please provide your answer'}
];

const QuestionService = {
  vote: vote
};

function vote(req, res) {

  let errors = RequestHelper.validateRequiredFields(req, voteRequiredFields);

  if (errors.length){
    return res.json(errors);
  }

  QuestionModel
    .findById(req.body.questionId)
    .populate({path: 'answers', select: 'user'})
    .exec((err, question) => {
      if (!question) {
        return res.json({error: true, message: 'There is no such question with given ID'});
      }

      if (_alreadyVoted(question, req)) {
        return res.json({error: true, message: 'Already voted'});
      } else {
        let answerModel = new AnswerModel({
          answer: req.body.answer,
          user: req.body.userEmail,
          timestamp: new Date().getTime(),
          comment: req.body.comment
        });

        answerModel.save((err, answer) => {
          if (err) {
            return res.json({error: true, message: 'Failed to save your answer, please try again'});
          }

          question.answers.push(answer._id);

          question.save((err) => {
            if (err) {
              return res.json({error: true, message: 'Question cannot be updated for mysterious reasons'});
            }
            res.json({success: true, message: 'Vote added'});
          })
        });
      }
    });
}

function _alreadyVoted(question, req) {
  return question.answers.find((answer) => {
    return answer.user === req.body.userEmail;
  });
}

module.exports = QuestionService;