const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const TestRoute = require('./src/routes/test.route');
const UserRoute = require('./src/routes/user.route');
const GroupRoute = require('./src/routes/group.route');

const app = express();

const port = process.env.PORT || 8080;

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.route('/').get((req, res) => {
  res.send('Hello Hackaton!');
});

app.use('/test', TestRoute);
app.use('/user', UserRoute);
app.use('/group', GroupRoute);

app.listen(port, () => {
  console.info("\x1b[36m", 'App is running on ' + port)
});

