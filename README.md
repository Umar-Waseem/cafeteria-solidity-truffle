# Decentralized Cafeteria System

## Description
This project is a _*decentralized*_ cafeteria system that allows users to order food from a cafeteria and pay for it using a cryptocurrency. The system is built using the Ethereum blockchain and the Solidity programming language. The system is deployed on the local ganache test network.

### Requirements
- [Docker](https://docs.docker.com/get-docker/)
- [NodeJS](https://nodejs.org/en/download/)
- [Ganache](https://www.trufflesuite.com/ganache)
- [Truffle](https://www.trufflesuite.com/truffle)

### Start On Docker (Wont have to install stuff manually)
1. Clone the repository

2. Run `docker-compose up` in the root directory of the project
3. Open `localhost:3000` in your browser to access the frontend
4. Ganache is running on `localhost:8545`
5. Use truffle to deploy the smart contracts to ganache
    - `truffle compile`
    - `truffle migrate`

### Start Without Docker (Have to install stuff manually)
1. Clone the repository

2. Run `npm start` in the frontend directory to start the frontend
3. Open `localhost:3000` in your browser to access the frontend
4. Open ganache software and start the local test network on port `8545`
5. Use truffle to deploy the smart contracts to ganache
    - `truffle compile`
    - `truffle migrate`

### Use truffle console to interact with the deployed contract
- Go to truffle console

    - `truffle console`
- Get the deployed contract instance
    - `let instance = await SimpleContract.deployed()`
- Call the contract functions
    - `instance.get()`
    - `instance.set(5)`
### Check account balances in ether
- Get all accounts

    - `let accounts = await web3.eth.getAccounts()`
- Get balance of an account
    - `let balance = await web3.eth.getBalance(accounts[0])`
- Convert balance to ether
    - `web3.utils.fromWei(balance, 'ether')`

