// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SimpleContract {
    uint public myNumber;

    constructor() {
        myNumber = 0;
    }

    function setNumber(uint _number) public {
        myNumber = _number;
    }

    function getNumber() public view returns (uint) {
        return myNumber;
    }
}
