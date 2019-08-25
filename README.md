# Ethereum Two Factor Authentication

## Basic Functionality Story

1. Users register with information such as username, password, name and **wallet address** .
2. Information is stored in the database .
3. User login as usually and backend migrate a new contract and send contract address to user
4. User sends a transaction (does not send ETH, only calls the contract function and pays the gas fee) to the 2FA contract.
5. Backend check that contract have authenticated or not
6. User is authenticated.

## Getting Started

Dependencies:

### Backend

- Node v7.6+ (NodeJs)

### Frontend

- ReactJs

### Blockchain

- Truffle
- Rinkeby network
- Metamask

# Setup .env

Create .env file

```js
MNEMONIC = 'YOUR MNEMONIC',
INFURA_KEY = <YOUR INFURA KEY>
```

Create .enc in /backend

```js
MONGODB_URI = 'LINK TO MONGODB', //like : MONGODB_URI = 'mongodb://dohoang123:dohoang123@ds347467.mlab.com:47467/2fa-ethereum',
MNEMONIC = <YOUR MNEMONIC>
INFURA_KEY = <YOUR INFURA KEY>
```

# Install local dependencies

In **_./_** and **_./backend_** and **_./frontend_**

```sh
npm install
```

or

```sh
yarn install
```

# Run testnet

## If run on local network

set up HDWalletProvider in contractWithBlockchain.js to any network you want

```js
let provider = new HDWalletProvider(
  process.env.MNEMONIC,
  `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
);
```

and then

```sh
yarn truffle develop --network truffleTestnet
```

Then run the console

```sh
yarn truffle console --network truffleTestnet
```

# If you run in testnet make sure your accout have eth

Run script in truffle develop

```js
// send 1 eth
web3.eth.sendTransaction({
  from: accounts[0],
  to: 'YOUR ACCOUNT ADDRESS',
  value: web3.utils.toWei('1', 'ether')
});
```

# Deploy contract

## If you run on local network

After fauct eth from account(0) , now you have enough eth to deploy

```sh
yarn truffle migrate --reset --network truffleTestnet
```

## If you run on Rinkeby network

```sh
yarn truffle migrate --network rinkeby
```

# Start server

```sh
cd backend/
yarn
yarn start
```

# Start client

```sh
cd frontend/
yarn
yarn start
```

```bash

# In a new terminal window, run the truffle tests

truffle test

```
