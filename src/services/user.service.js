const UserModel = require('../models/user.model');

const UserService = {
  save
};

function save(req, res) {
  if(!req.body.email){
    return res.json({success: false, message: 'Please provide email'});
  }

  let userModel = new UserModel({
    email: req.body.email,
    group: "unknown"
  });

  userModel.save(function () {
    res.json({success: true, message: 'User Saved'});
  })
}

module.exports = UserService;