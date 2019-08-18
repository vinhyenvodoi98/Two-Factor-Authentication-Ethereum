var fs = require('fs');

var Factory = artifacts.require('Factory');

module.exports = async function(deployer) {
  deployer.deploy(Factory).then(async () => {
    var factory = await Factory.deployed().then((detail) => {
      address = '{' + '"address":' + '"' + detail.constructor.address + '"' + '}';
      fs.writeFile('factory.json', address, 'utf8', (err) => {
        console.log(detail.constructor.address);
      });
    });
    // first contract with account(0) in test net
    // await factory.createTwoFactorAuth('0x12379aa4b5651340c787a1c38c2d5d776192c0f3');
  });
};
