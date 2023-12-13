// SPDX-License-Identifier: MIT

// Implements the rector’s vision of FastCoin as ERC20
// token standard, serving as a utility token for financial transactions within the cafeteria system.
// This contract manages functions for processing payments, deducting token amounts, and
// ensuring secure transactions.
// Needless to say, the owner of this contract will be university management.

pragma solidity ^0.8.17;

interface ERC20 {
    // total supply of the tokens
    function totalSupply() external view returns (uint256);
    // balance of a particular account
    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address _owner, address _spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event TransferEvent(address from, address to, uint256 value);
    event Approval(address owner, address spender, uint256 value);
}

// This is a custom utility token for the cafeteria system

contract FastCoin is ERC20 {
    string public name = "FastCoin";
    string public symbol = "FC";
    
    address public owner;
    // 1 FastCoin = 1 * 10^18 wei
    uint256 public totalTokenSupply = 1000000 * (10**18);

    // which address has how many tokens
    mapping(address => uint256) public balances;

    // which address has allowed which address to spend how many tokens
    mapping(address => mapping(address => uint256)) public allowances;

    constructor() {
        owner = msg.sender;
        // give half of the tokens to the owner
        balances[owner] = totalTokenSupply / 2;
    }

    // total supply of the tokens
    function totalSupply() external view override returns (uint256) {
        return totalTokenSupply;
    }

    // balance of a particular account
    function balanceOf(address account) external view override returns (uint256) {
        return balances[account];
    }

    // transfer tokens from the contract invoker to the recipient
    function transfer(address recipient,uint256 amount) external returns (bool){
        require(balances[msg.sender] >= amount, "You dont have enough balance to transfer the amount");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit TransferEvent(msg.sender, recipient, amount);
        return true;
    }

    // set allowance, how much another address can spend on behalf of another address
    function approve(address spender,uint256 value) external returns (bool) {
        require(balances[msg.sender] >= value, "You dont have enough balance to set the allowance amount");
        allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;    
    }

    // check the allowance and its availablity
    function allowance(address _owner, address _spender) external view returns (uint256){
        return allowances[_owner][_spender];
    }

    function transferFrom(address sender,address recipient,uint256 amount) external returns (bool) {
        // sender should have enough balance to spend
        require(balances[sender] >= amount, "The sender balance is less than the amount");
        require(allowances[sender][msg.sender] >= amount, "The allowance for contract invoker is less than the amount");

        // cut balance from sender and add to reciepent
        balances[sender] -= amount;
        balances[recipient] += amount;

        allowances[sender][msg.sender] -= amount;

        return true;
    }
}