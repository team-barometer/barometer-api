const GroupModel = require('../models/group.model');
const PoolModel = require('../models/pool.model');
const UserModel = require('../models/user.model');

const GroupService = {
  save: save,
  addPollToGroup: addPollToGroup,
  getPools: getPools,
  updateUserAnswer: updateUserAnswer,

  getGroupByUserEmail: getGroupByUserEmail,
  getGroupPollByUserEmail: getGroupPollByUserEmail,
  getGroupByName: getGroupByName
};

const USERS = [
  {
    email: 'vytautas.sugintas@gmail.com',
    answer: false
  },
  {
    email: 'minijus.laukaitis@gmail.com',
    answer: false
  }
];

function getPools(req, res) {
  GroupModel.findOne({title: 'unknown'}, (err, group) => {
    if (err) {
      return res.send({error: true, message: 'Wrong email'})
    }

    if (!group) {
      return res.send({error: false, message: 'Nothing found'})
    }

    res.send(group.pools);
  })
}

/**
 @params
 {email|id|vote|comment}
 */
function updateUserAnswer(req, res) {
  if (!req.body.email) {
    return res.json({success: false, message: 'Please provide user email'});
  }

  if (!req.body.id) {
    return res.json({success: false, message: 'Please provide poll id'});
  }

  GroupModel.findOne({title: 'unknown'}, (err, group) => {
    if (err) {
      return res.send({error: true, message: 'Wrong email'})
    }

    if (!group) {
      return res.send({error: false, message: 'Nothing found'})
    }

    let pollToUpdateIndex = group.pools.findIndex((item) => {
      return item._id == req.body.id;
    });

    let user;

    if (group.pools[pollToUpdateIndex].users) {
      user = group.pools[pollToUpdateIndex].users.find((user) => {
        return user.email == req.body.email;
      });
    }

    if (user) {
      return res.send({error: true, message: "Already voted!"});
    }

    group.pools[pollToUpdateIndex].users.push(new UserModel({
      email: req.body.email,
      vote: req.body.vote,
      comment: req.body.comment ? req.body.comment : ""
    }));

    group.markModified('pools');

    group.save((err, updatedGroup) => {
      if (err) {
        return res.send({error: true, message: "Something wrong happened"});
      }

      res.send(updatedGroup);
    });
  })
}

function getGroupByName(req, res) {
  GroupModel.find({title: req.params.title}, (err, groups) => {
    if (err) {
      return res.send({error: true, message: 'Wrong email'})
    }

    if (!groups) {
      return res.send({error: false, message: 'Nothing found'})
    }

    res.send(groups);
  })
}

function getGroupByUserEmail(req, res) {
  UserModel.findOne({email: req.params.email}, (err, user) => {
    GroupModel.findOne({title: user.group}, (err, group) => {
      if (err) {
        return res.send({error: true, message: 'Wrong email'})
      }

      if (!group) {
        return res.send({error: false, message: 'Nothing found'})
      }

      let pool = group.pools.find((item) => {
        return item.active = true;
      });

      res.send(pool);
    })
  });
}

function getGroupPollByUserEmail(req, res) {
  UserModel.findOne({email: req.params.email}, (err, user) => {
    GroupModel.findOne({title: user.group}, (err, group) => {
      if (err) {
        return res.send({error: true, message: 'Wrong email'})
      }

      if (!group) {
        return res.send({error: false, message: 'Nothing found'})
      }

      const pool = group.pools.find((item) => {
        return item.active;
      });

      res.send(pool);
    })
  });
}


function save(req, res) {
  if (!req.body.title) {
    return res.json({success: false, message: 'Please provide title'});
  }

  let groupModel = new GroupModel({
    title: req.body.title,
    users: [],
    pools: [],
    createdAt: new Date().getTime()
  });

  groupModel.save(() => {
    res.json({success: true, message: 'Group Saved'});
  })
}

/**
 * @params
 *  {poolTitle|theme|options}
 *
 *  {
    value: 0,
    name: "bad"
  }, {
    value: 1,
    name: "neutral"
  }, {
    value: 2,
    name: "good"
  }, {
    value: 3,
    name: "wow"
  }
 */
function addPollToGroup(req, res) {
  GroupModel.findOne({title: 'unknown'}, (err, group) => {
    if (err) {
      return res.send({error: true, message: 'Wrong email'})
    }

    if (!group) {
      return res.send({error: false, message: 'Nothing found'})
    }

    group.pools.push(new PoolModel({
      title: req.body.poolTitle,
      theme: req.body.theme ? req.body.theme : 'default',
      options: req.body.options,
      active: true,
      users: [UserModel],
      question: req.body.question,
      createdAt: new Date().getTime()
    }));

    group.save((err, updatedGroup) => {
      res.send(updatedGroup);
    });

  })
}

module.exports = GroupService;