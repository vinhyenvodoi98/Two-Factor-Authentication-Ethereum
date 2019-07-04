const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.json({
    message: 'hello world'
  });
});

router.post('/signup', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  });
  if (user != null) {
    await new User({
      name: name,
      username: username,
      password: password,
      accounts: accounts
    }).save();
    await res.status(200).json({
      authenticated: true,
      message: 'user successfully signup'
    });
  } else {
    await res.status(200).json({
      authenticated: false,
      message: 'Account already exists '
    });
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  });
  if (user != null) {
    console.log(req.body);
    await res.status(200).json({
      authenticated: true,
      message: 'user successfully authenticated'
    });
  }
});

module.exports = router;
