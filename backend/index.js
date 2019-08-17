const express = require('express');
const app = express();
const port = 4000;
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const login = require('./routes/login');
require('dotenv').config();
require('express-session');

// create .env and setup mongo like this
// MONGODB_URI = 'mongodb://<username>:<pass>@<yourId>.mlab.com:<yourDatabase>/'

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log('connected to mongo db');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: '*', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use('/', login);

app.listen(port, () => console.log(`Server is running on port ${port}!`));

module.exports = app;
