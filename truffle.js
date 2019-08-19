const HDWalletProvider = require('truffle-hdwallet-provider');
const path = require('path');
require('dotenv').config();
const mnemonic = 'soup click poverty tooth struggle cash heart have supply sport clean quality';

module.exports = {
  contracts_build_directory: path.join(__dirname, 'frontend/src/contracts'),

  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`),
      gas: 4712388,
      gasPrice: 100000000000,
      network_id: '*'
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
        );
      },
      network_id: '*'
    },
    truffleTestnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `http://localhost:9545`);
      },
      network_id: '*'
    }
  }
};
