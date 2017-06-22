const TestModel = require('../models/test.model');

const TestService = {
  test: test,
  getOneTest: getOneTest,
  getAllTests: getAllTests
};

function test(req, res) {
  let testModel = new TestModel({
    message: req.body.message,
    type: req.body.type,
    timeStamp: new Date().toDateString()
  });

  testModel.save(function () {
    res.json({success: true, message: 'Test Passed', savedObject: testModel});
  })
}

function getOneTest(req, res) {
  TestModel.findOne({_id: req.params.id}, (err, test) => {
    if (err) {
      return res.send({error: true, message: 'Wrong id'})
    }

    if (!test) {
      return res.send({error: false, message: 'Nothing found'})
    }

    res.send(_mapTest(test));
  })
}

function getAllTests(res) {
  TestModel.find({}, (err, tests) => {
    res.send(tests.map(_mapTest));
  });
}

function _mapTest(test) {
  if (test) {
    return {
      id: test._id,
      message: test.message,
      type: test.type,
      timeStamp: test.timeStamp
    }
  }
}

module.exports = TestService;