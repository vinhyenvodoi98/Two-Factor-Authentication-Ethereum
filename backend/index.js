const cookieSession = require('cookie-session');
const express = require('express');
const app = express();
const port = 4000;
// const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // parse cookie header
require('express-session');
// const authRoutes = require('./routes/auth');
// const dailybonusRoutes = require('./routes/dailybonus');
// const helper = require('./helper/loomClient.js');
// require('./config/passport-setup');

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
//   console.log('connected to mongo db');
// });

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000 * 365
  })
);

// parse cookies
app.use(cookieParser());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: process.env.CLIENT_URL, // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get('/', (req, res) => {
  res.json({
    message: 'hello world'
  });
});

app.post('/', (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated',
    user: req.user,
    cookies: req.cookies
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}!`));

module.exports = app;
