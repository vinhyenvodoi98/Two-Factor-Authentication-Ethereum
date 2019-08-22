# Ethereum Two Factor Authentication

Simple contract for two factor authentication to online services via Ethereum transactions. Note **this concept has security and usability flaws**, and is therefore merely a demonstration of a basic smart contract and testing with truffle.

## Basic Functionality Story

1. User logs in to example.com with username-password.
2. example.com asks the user to send a transaction to their 2FA contract, and starts waiting for an Authenticated event. (Note: events before this login are ignored). A reasonable timeout should be set to account for fees and network congestion — after which this login is rejected if no Authenticated event is heard for this user's Ethereum address.
3. User sends a transaction (does not send ETH, only calls the contract function and pays the gas fee) to the example.com 2FA contract.
4. example.com sees an Authenticated event on the contract, and provided it is within the timeout and was created by the user's Ethereum address, allows the login.
5. User is authenticated.

## Critical Issues with Blockchain 2FA

**Note this is not a serious suggestion**, and is merely a demonstration of a very basic smart contract. Reasons that 2FA through Ethereum contracts is an awful idea:

- It does not add any real security. If an attacker already has your password, if they also know your public Ethereum address, they could simply listen to the blockchain for 2FA activity on your address and attempt their login around the same time (in the hope for a second login attempt in succession).
- Every 2FA would cost the user at least the minimum network fee, and may be subject to high fees or slow confirmations due to network congestion.
- The usability of this system would likely be worse than a typical 2FA system such as one-time-passwords provided by 1Password, Google Authenticator, or Authy.

## Getting Started

Dependencies:

- Node v7.6+
- Ethereum TestRPC
- Truffle

# Setup .env

Create .env file

```js
MNEMONIC = 'YOUR MNEMONIC',
INFURA_KEY = <YOUR INFURA KEY>
```

Create .enc in /backend

```js
MONGODB_URI = 'LINK TO MONGODB', //like : MONGODB_URI = 'mongodb://dohoang123:dohoang123@ds347467.mlab.com:47467/2fa-ethereum',
MNEMONIC = <YOUR MNEMONIC>,
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

```sh
yarn truffle develop --network truffleTestnet
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

After fauct eth from account(0) , now you have enough eth to deploy

```sh
yarn truffle migrate --reset --network truffleTestnet
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
