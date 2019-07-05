const TwoFactorAuth = artifacts.require('./TwoFactorAuth.sol');

module.exports = function(deployer) {
  deployer.deploy(TwoFactorAuth, '0x4C637fC36ecA2d02d5214b53c0aEc272f31F7E53');
};
