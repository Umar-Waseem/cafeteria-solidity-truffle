// SPDX-License-Identifier: MIT

// Facilitates the order processing system, allowing users
// to select items, specify quantities, and place orders. This contract calls functions from the
// menu management contract to retrieve item details and calculates the total order amount.

pragma solidity ^0.8.17;

import "./MenuManagement.sol";

contract OrderContract{
    address public owner; 
    MenuManagement public menuManagementInstance;

    constructor(MenuManagement _menuManagementInstance) {
        owner = msg.sender;
        menuManagementInstance = _menuManagementInstance;
    }

    // to check how much u have to pay
    function calculateOrderAmount(uint256[] memory _itemIndexes, uint256[] memory _quantities) public view returns (uint256){
        require(_itemIndexes.length == _quantities.length, "Error: Item and quantity count mismatch");
        // check for an invalid item index
        for (uint256 i = 0; i < _itemIndexes.length; i++) {
            require(_itemIndexes[i] < menuManagementInstance.getItemsCount(), "Invalid item index");
        }
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _itemIndexes.length; i++) {
            uint256 itemIndex = _itemIndexes[i];
            uint256 quantity = _quantities[i];
            uint256 itemPrice = menuManagementInstance.getItemPrice(itemIndex);
            totalAmount += itemPrice * quantity;
        }
        return totalAmount * (10**18);
    }

    // to actually place an order if youre not broke
    function placeOrder(uint256[] memory _itemIndexes, uint256[] memory _quantities) public payable {
        // check for an invalid item index
        for (uint256 i = 0; i < _itemIndexes.length; i++) {
            require(_itemIndexes[i] < menuManagementInstance.getItemsCount(), "Error: Item and quantity count mismatch");
        }
        uint256 totalAmount = calculateOrderAmount(_itemIndexes, _quantities);
        require(msg.value == totalAmount, "You didnt pay enough");
        payable(owner).transfer(totalAmount);
    }


}