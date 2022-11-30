// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract SimpleStorage {
    mapping(address => uint) s_addressToFavoriteNumber;

    constructor() {
        s_addressToFavoriteNumber[msg.sender] = 6;
    }

    function store(uint number) external {
        console.log("Storing number %s", number);

        s_addressToFavoriteNumber[msg.sender] = number;
    }

    function retrieve() public view returns (uint256) {
        return s_addressToFavoriteNumber[msg.sender];
    }
}
