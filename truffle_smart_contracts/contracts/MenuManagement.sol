// SPDX-License-Identifier: MIT

// Manages the cafeteria menu, including items, prices,
// and availability. This contract provides functions for the cafeteria staff to add new menu items,
// update prices, and check item availability.

pragma solidity >=0.8.2 <0.9.0;

contract MenuManagement{

    // state variables (stored directly on the blockchain)
    address public owner;

    // called only once when the smart contract is deployed to the blockchain
    constructor() {
        owner = msg.sender;
    }

    struct MenuItem {
        string itemName;
        uint256 quantity;
        uint256 price;
    }

    // array to store menu items
    MenuItem[] public menuItems;

    function getItemsCount() public view returns (uint256) {
        return menuItems.length;
    }

    // function getAllMenuItems() public view returns (MenuItem[] memory) {
    //     return menuItems;
    // }

    // allows only the owner (cafeteria staff) to add menu items
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner (cafeteria staff) can add menu items");
        _;
    }

    function addMenuItem(string memory _itemName, uint256 _itemQuantity, uint256 _itemPrice) onlyOwner public {
        menuItems.push(MenuItem(_itemName, _itemQuantity, _itemPrice * 1 ether));
    }

    function updateMenuItemPrice(uint256 _index, uint256 _itemPrice) onlyOwner public {
        require(_index < menuItems.length, "Invalid index");
        // multiply by 1 ether to convert to wei
        menuItems[_index].price = _itemPrice * 1 ether;
    }

    function getItemPrice(uint256 _index) public view returns (uint256) {
        require(_index < menuItems.length, "Invalid index");
        // divide by 1 ether to convert to ether
        return menuItems[_index].price / 1 ether;
    }

    function updateMenuItemQuantity(uint256 _index, uint256 _itemQuantity) onlyOwner public {
        require(_index < menuItems.length, "Invalid index");
        menuItems[_index].quantity = _itemQuantity;
    }

    function getItemQuantity(uint256 _index) public view returns (uint256) {
        require(_index < menuItems.length, "Invalid index");
        return menuItems[_index].quantity;
    }

    function checkAvailability(uint256 _index) public view returns (bool) {
        require(_index < menuItems.length, "Invalid index");
        // available if quantity is more than 0
        return (menuItems[_index].quantity > 0);
    }


}
