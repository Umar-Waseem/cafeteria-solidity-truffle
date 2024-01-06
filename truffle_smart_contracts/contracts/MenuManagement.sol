// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 < 0.9.0;

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

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    modifier indexCheck(uint256 _index){
        require(_index < menuItems.length, "Invalid index");
        _;

    }

    function addItem(string memory _itemName, uint256 _itemQuantity, uint256 _itemPrice) public onlyOwner{
        menuItems.push(MenuItem(_itemName, _itemQuantity, _itemPrice));
    }

    function updatePrice(uint256 _index, uint256 _itemPrice) public onlyOwner indexCheck(_index){
        // multiply by 1 ether to convert to wei
        menuItems[_index].price = _itemPrice;
    }

    function getPrice(uint256 _index) public view indexCheck(_index) returns (uint256){
        // divide by 1 ether to convert to ether
        return menuItems[_index].price;
    }

    function updateQuantity(uint256 _index, uint256 _itemQuantity) public indexCheck(_index){
        menuItems[_index].quantity = _itemQuantity;
    }

    function getItemQuantity(uint256 _index) public view indexCheck(_index) returns (uint256) {
        return menuItems[_index].quantity;
    }

    function checkAvailability(uint256 _index) public view indexCheck(_index) returns (bool) {
        // available if quantity is more than 0
        return (menuItems[_index].quantity > 0);
    }


}