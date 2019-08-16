const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.json({
    message: 'hello world'
  });
});

router.post('/image', async (req, res) => {
  console.log(req.body);
  await res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated'
    // contractAdress: '0xb469092982e3a7b19B6e0aa477B0A26a77dB3A50'
  });
});

router.post('/signup', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  });
  if (user == null) {
    await new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      accounts: req.body.accounts
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
    // console.log(req.body);
    await res.status(200).json({
      authenticated: true,
      message: 'user successfully authenticated',
      contractAdress: '0xb469092982e3a7b19B6e0aa477B0A26a77dB3A50'
    });
  }
});

module.exports = router;
