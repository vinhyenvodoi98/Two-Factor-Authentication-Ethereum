const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('../helpers/contactWithBlockchain');

const saltRounds = 10;

// router.post('/2FAuth', async (req, res) => {
//   var contractAddress = await helper.createContract(req.body.address);
//   res.json({
//     authenticated: true,
//     contractAddress: contractAddress
//   });
// });

router.post('/image', async (req, res) => {
  await res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated'
  });
});

router.post('/signup', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  });

  if (user == null) {
    password = await bcrypt.hash(req.body.password, saltRounds);

    await new User({
      name: req.body.name,
      username: req.body.username,
      password: password,
      etherAddress: req.body.etherAddress
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
    // console.log('user', user);
    var contractAddress = await helper.createContract(req.body.etherAddress);
    // query user address from database
    hash = user.password;
    bcrypt.compare(req.body.password, hash, function(err, resquest) {
      if (resquest) {
        res.status(200).json({
          authenticated: true,
          message: 'user successfully logged',
          // authenticated
          contractAddress: contractAddress
        });
      } else {
        res.status(200).json({
          authenticated: false,
          message: 'wrong password'
          // authenticated
        });
      }
    });
  } else {
    await res.status(200).json({
      authenticated: false,
      message: "this account doesn't exist"
    });
  }
});

module.exports = router;
