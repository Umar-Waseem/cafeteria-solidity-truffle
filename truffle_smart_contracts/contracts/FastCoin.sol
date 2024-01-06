// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 < 0.9.0;

interface ERC20 {
    // total supply of the tokens
    function totalSupply() external view returns (uint256);
    // balance of a particular account
    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

}

contract FastCoin is ERC20 {
    string public name = "FastCoin";
    string public symbol = "FC";
    
    address public cafe;
    uint256 public totalTokenSupply = 1000000 * (10**18);

    // which address has how many tokens
    mapping(address => uint256) public balances;

    // which address has allowed which address to spend how many tokens
    mapping(address => mapping(address => uint256)) public allowances;

    constructor() {
        cafe = msg.sender;
        // give half of the tokens to the owner
        balances[cafe] = totalTokenSupply;
    }

    // total supply of the tokens
    function totalSupply() external view override returns (uint256) {
        return totalTokenSupply;
    }

    // balance of a particular account
    function balanceOf(address account) external view override returns (uint256) {
        return balances[account];
    }

    function getTokens() external payable{
        //1 eth = 100 FC
        payable(cafe).transfer(msg.value);
        uint256 tokensToSend = (msg.value/1 ether)*100;
        balances[msg.sender] += tokensToSend;
        balances[cafe] -= tokensToSend;
    }

    function transferToCafe(address customer, uint256 amount) external returns (bool){
        require(balances[customer]>=amount, "Insufficient Funds");
        balances[customer] -= amount;
        balances[cafe] += amount;
        return true;
    }

    function transferFromCafe(address customer, uint256 amount) external returns (bool){
        require(balances[cafe]>=amount, "Insufficient Funds");
        balances[cafe] -= amount;
        balances[customer] += amount;
        return true;
    }

    // transfer tokens from the contract invoker to the recipient
    function transfer(address recipient,uint256 amount) external returns (bool){
        require(balances[msg.sender] >= amount, "You dont have enough balance to transfer the amount");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return true;
    }

}