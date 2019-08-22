require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
let provider = new HDWalletProvider(process.env.MNEMONIC, 'http://localhost:8545');
var Factory = require('../../frontend/src/contracts/Factory.json');
var TwoFactorAuth = require('../../frontend/src/contracts/TwoFactorAuth.json');
var factoryAddress = require('../../factory.json');

// HDWalletProvider is compatible with Web3. Use it at Web3 constructor, just like any other Web3 Provider
const web3 = new Web3(provider);

// Or, if web3 is alreay initialized, you can call the 'setProvider' on web3, web3.eth, web3.shh and/or web3.bzz
web3.setProvider(provider);

const setCEO = async () => {
  const from = await web3.eth.getCoinbase();
  const factoryContract = new web3.eth.Contract(Factory.abi, factoryAddress.address, { from });
  var ceoAddress = await factoryContract.methods.ceoAddress().call({ from });
  return ceoAddress;
};

const createContract = async (userAddress) => {
  const from = await web3.eth.getCoinbase();
  const factoryContract = new web3.eth.Contract(Factory.abi, factoryAddress.address, { from });
  //this create function don't return address as the logic in contract
  await factoryContract.methods.createTwoFactorAuth(userAddress.toString()).send({ from });

  var OTP = await factoryContract.methods.getAllOTP().call({ from });
  return OTP.slice(-1)[0];
};

const checkVerify = async (contractAddress) => {
  const from = await web3.eth.getCoinbase();
  const twoFactorAuthContract = await new web3.eth.Contract(TwoFactorAuth.abi, contractAddress, {
    from
  });

  // solidity ver ^5.1, the call function can't return any thing
  // TODO research suitable version
  const isVerify = await twoFactorAuthContract.methods.isUserLogin().call({ from });

  return isVerify;
};

module.exports = {
  setCEO,
  createContract,
  checkVerify
};
