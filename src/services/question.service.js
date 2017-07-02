const QuestionModel = require('../models/question.model');
const AnswerModel = require('../models/answer.model');

const PollService = {
  vote: vote
};

function vote(req, res) {
  if (!req.body.userEmail) {
    return res.json({error: true, field: 'userEmail', message: 'Please provide voter email'});
  }

  if (!req.body.questionId) {
    return res.json({error: true, field: 'questionId', message: 'Please provide question ID'});
  }

  if (!req.body.answer) {
    return res.json({error: true, field: 'answer', message: 'Please provide your answer'});
  }

  QuestionModel
    .findById(req.body.questionId)
    .populate({path: 'answers', select: 'user'})
    .exec((err, question) => {
      if (!question) {
        return res.json({error: true, message: 'There is no such question with given ID'});
      }

      let alreadyVoted = question.answers.find((answer) => {
        return answer.user === req.body.userEmail;
      });

      if (alreadyVoted) {
        return res.json({error: true, message: 'Already voted'});
      } else {

        let answerModel = new AnswerModel({
          answer: req.body.answer,
          user: req.body.userEmail,
          timestamp: new Date().getTime()
        });

        answerModel.save((err, answer) => {
          if (err) {
            return res.json({error: true, message: 'Failed to save your answer, please try again'});
          }

          question.answers.push(answer._id);

          question.save((err, question) => {
            if (err) {
              return res.json({error: true, message: 'Question cannot be updated for mysterious reasons'});
            }
            res.json({success: true, message: 'Vote added'});
          })
        });
      }
    });
}

module.exports = PollService;