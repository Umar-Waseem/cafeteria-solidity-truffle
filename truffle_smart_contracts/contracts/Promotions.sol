// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 < 0.9.0;

contract Promotions{

    uint256 public discount;
    address public owner;


    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    function setDiscount(uint256 disc) public onlyOwner{
        discount = disc;
    } 

    function applyDiscount(uint256 amount) public view returns (uint256){
        return (amount * (100 - discount)) / 100;
    }
    
}