const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const UserRoute = require('./src/routes/user.route');
const GroupRoute = require('./src/routes/group.route');

const port = process.env.PORT || 8080;

const mongoOptions = {
  server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
  replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
};

const mongodbUri = 'mongodb://hackatonas:hackatonas12@ds117209.mlab.com:17209/matcher';

const conn = mongoose.connection;

mongoose.connect(mongodbUri, mongoOptions);

conn.once('open', () => {
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


app.get('/', (req, res) => {
  res.send('qq');
});

let connections = [];

io.on('connection', (socket) => {
  connections.push(socket);
  socket.emit('news', {hello: 'world'});
  console.log('someone connected with id: ' + socket.id);
  socket.on('my other event', (data) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('someone disconnected');
    io.emit('user disconnected');
  });
});

server.listen(port, () => {
  console.info("\x1b[36m", 'App is running on ' + port)
});

