const GroupModel = require('../models/group.model');
const PoolModel = require('../models/pool.model');

const GroupService = {
  save: save,
  getGroupByName: getGroupByName,
  addPollToGroup: addPollToGroup,
  updateUserAnswer: updateUserAnswer
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


function addPollToGroup(req, res) {
  GroupModel.findOne({title: req.body.title}, (err, group) => {
    if (err) {
      return res.send({error: true, message: 'Wrong email'})
    }

    if (!group) {
      return res.send({error: false, message: 'Nothing found'})
    }

    group.pools.push(new PoolModel({
      title: req.body.poolTitle,
      users: USERS,
      question: req.body.question,
      createdAt: new Date().toDateString()
    }));

    group.save((err, updatedGroup) => {
      res.send(updatedGroup);
    });

  })
}

function updateUserAnswer(req, res) {
  if (!req.body.email) {
    return res.json({success: false, message: 'Please provide user email'});
  }

  if (!req.body.id) {
    return res.json({success: false, message: 'Please provide poll id'});
  }

  GroupModel.findOne({title: req.body.title}, (err, group) => {
    if (err) {
      return res.send({error: true, message: 'Wrong email'})
    }

    if (!group) {
      return res.send({error: false, message: 'Nothing found'})
    }

    let pollToUpdateIndex = group.pools.findIndex((item) => {
      return item._id == req.body.id;
    });

    let poolToUpdate = group.pools.find((item) => {
      return item._id == req.body.id;
    });

    poolToUpdate.users.map((user) => {
      return (user.email == req.body.email) ? user.answer = req.body.choice : user;
     });

    group.pools[pollToUpdateIndex] = poolToUpdate;

    group.save((err, updatedGroup) => {
      if (err){
        return res.send({error: true, message: "Something wrong happened"});
      }
      return res.send(updatedGroup);
    });
  })
}

function save(req, res) {
  if (!req.body.title) {
    return res.json({success: false, message: 'Please provide title'});
  }

  let groupModel = new GroupModel({
    title: req.body.title,
    users: [],
    pools: [],
    createdAt: new Date().toDateString()
  });

  groupModel.save(() => {
    res.json({success: true, message: 'Group Saved'});
  })
}

module.exports = GroupService;