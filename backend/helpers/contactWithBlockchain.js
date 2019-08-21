require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
let provider = new HDWalletProvider(process.env.MNEMONIC, 'http://localhost:9545');
var Factory = require('../../frontend/src/contracts/Factory.json');
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
  var createTwoFactorAuth = await factoryContract.methods
    .createTwoFactorAuth(userAddress.toString())
    .send({ from });

  var OTP = await factoryContract.methods.getAllOTP().call({ from });
  return OTP.slice(-1)[0];
};

const checkUserLogin = () => {
  //check is user login
};

module.exports = {
  setCEO,
  createContract,
  checkUserLogin
};
