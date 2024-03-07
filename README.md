# Decentralized Cafeteria System

## Description
This project is a _*decentralized*_ cafeteria system that allows users to order food from a cafeteria and pay for it using a custom made token called FastCoin.  The contracts are deployed on the local ganache test network.

## Requirements
- [Docker](https://docs.docker.com/get-docker/)
- [NodeJS](https://nodejs.org/en/download/)
- [Ganache](https://www.trufflesuite.com/ganache)
- [Truffle](https://www.trufflesuite.com/truffle)

## Contrbutors

- [Muhammad Umar Waseem](https://github.com/Umar-Waseem)
- [Muhammad Huzaifa](https://github.com/huzziaf)
- [Umar Qazi](https://github.com/umarqazii)
- [Abdul Wahab](https://github.com/AWahab02)

## Ways to setup

1. ### Start On Docker (Wont have to install stuff manually)
    1. Clone the repository
    
    2. Spin up the docker containers
        ```
        docker-compose up
        ```
    3. Open `localhost:3000` in your browser to access the frontend
    4. Ganache is running on `localhost:8545`
    5. Use truffle to deploy the smart contracts to ganache
        - Compile the contracts
            ```
            truffle compile
            ```
        - Deploy the contracts
            ```
            truffle migrate
            ```

2. ### Start Without Docker (Have to install stuff manually)
    1. Clone the repository
    
    2. Run `npm start` in the frontend directory to start the frontend
    3. Open `localhost:3000` in your browser to access the frontend
    4. Open ganache software and start the local test network on port `8545`
    5. Use truffle to deploy the smart contracts to ganache
        - Compile the contracts
            ```
            truffle compile
            ```
        - Deploy the contracts
            ```
            truffle migrate
            ```

## Ways to interact and invoke the smart contracts

1. ### Use truffle console to interact with the deployed contract
    - Go to truffle console
        ```
        truffle console
        ```
    - Get the deployed contract instance
        ```
        let instance = await MenuManagement.deployed()
        ```

2. ### Use javascript to interact with the deployed contract

    - Run following in root
        ```
        cd truffle_smart_contracts
        ```
    - Run
        ```
        npm install
        ```
    - Then run the script
        ```
        node execute.js
        ```
3. ### Spin up the react app and use it
    - Open following URL
        ```
        localhost:3000
        ```


