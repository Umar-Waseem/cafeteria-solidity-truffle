// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 < 0.9.0;

import "./MenuManagement.sol";
import "./Promotions.sol";
import "./RewardsLoyalty.sol";

contract OrderContract{
    address public owner; 
    MenuManagement public mm;
    Promotions public pr;
    RewardsLoyalty public rl;
    FastCoin public fc;

    constructor(MenuManagement _mm, Promotions _pr, RewardsLoyalty _rl, FastCoin _fc) {
        owner = msg.sender;
        mm = _mm;
        pr = _pr;
        rl = _rl;
        fc = _fc;
    }

    function calculateOrderAmount(uint256[] memory _itemIndexes, uint256[] memory _quantities) public view returns (uint256){
        require(_itemIndexes.length == _quantities.length, "Error: Item and quantity count mismatch");
        
        // check for an invalid item index and availability
        for (uint256 i = 0; i < _itemIndexes.length; i++) {
            require(_itemIndexes[i] < mm.getItemsCount(), "Invalid item index");
            require(mm.checkAvailability(_itemIndexes[i]), "Item out of stock");
        }

        uint256 totalAmount = 0;

        for (uint256 i = 0; i < _itemIndexes.length; i++) {
            uint256 itemPrice = mm.getPrice(_itemIndexes[i]);
            totalAmount += itemPrice * _quantities[i];
        }
        //returning discounted value
        return  pr.applyDiscount(totalAmount);
    }


    function placeOrder(uint256[] memory _itemIndexes, uint256[] memory _quantities, uint payment) public{
        uint256 totalAmount = calculateOrderAmount(_itemIndexes, _quantities);
        require(payment >= totalAmount, "You didnt pay enough");

        for (uint256 i = 0; i < _itemIndexes.length; i++) {
            mm.updateQuantity(_itemIndexes[i], mm.getItemQuantity(_itemIndexes[i]) - _quantities[i]);
        }

        rl.incTokens(msg.sender);
        fc.transferToCafe(msg.sender, payment);
    }


}