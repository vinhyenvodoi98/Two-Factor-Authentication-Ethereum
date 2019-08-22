const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('../helpers/contactWithBlockchain');

const saltRounds = 10;

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
      signup: true,
      message: 'user successfully signup'
    });
  } else {
    await res.status(200).json({
      signup: false,
      message: 'Account already exists '
    });
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  });
  if (user != null) {
    var contractAddress = await helper.createContract(user.etherAddress);
    // query user address from database
    hash = user.password;
    bcrypt.compare(req.body.password, hash, function(err, resquest) {
      if (resquest) {
        res.status(200).json({
          authenticated: true,
          message: 'user successfully logged',
          contractAddress: contractAddress
        });
      } else {
        res.status(200).json({
          authenticated: false,
          message: 'wrong password'
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

router.post('/checkVerify', async (req, res) => {
  var isVerify = await helper.checkVerify(req.body.contractAddress);
  if (isVerify) {
    const user = await User.findOne({
      etherAddress: req.body.userAddress
    });

    await res.status(200).json({
      verified: true,
      message: 'verification successfully',
      name: user.name
    });
  } else {
    await res.status(200).json({
      verified: false,
      message: 'verification failed'
    });
  }
});

module.exports = router;
