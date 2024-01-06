// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 < 0.9.0;

import "./FastCoin.sol";

contract RewardsLoyalty{
    mapping(address => uint256) public loyaltyTokens;
    FastCoin public fc;
    address public owner;
    
    constructor(FastCoin _fc){
        owner = msg.sender;
        fc = _fc;
    }

    function incTokens(address _customer) public {
        //10 loyalty points given for each purchase
        loyaltyTokens[_customer]+=10;
    }

    function redeemPrize() public{
        uint256 prize = loyaltyTokens[msg.sender]/10;
        loyaltyTokens[msg.sender] = 0;
        fc.transferFromCafe(msg.sender, prize);
    }

}