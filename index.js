const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const UserRoute = require('./src/routes/user.route');
const GroupRoute = require('./src/routes/group.route');

const app = express();

const port = process.env.PORT || 8080;

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://hackatonas:hackatonas12@ds117209.mlab.com:17209/matcher';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

// mongoose.connect(config.database);

conn.once('open', function() {
  console.log("Mongo connected");
});

conn.on('error', console.error.bind(console, 'connection error:'));

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.route('/').get((req, res) => {
  res.send('Hello Hackaton!');
});

app.use('/user', UserRoute);
app.use('/group', GroupRoute);

app.listen(port, () => {
  console.info("\x1b[36m", 'App is running on ' + port)
});

