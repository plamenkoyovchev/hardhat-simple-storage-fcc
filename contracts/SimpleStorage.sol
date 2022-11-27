// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract SimpleStorage {
    uint256 s_lastStoredFavoriteNumber;
    mapping(address => uint) s_addressToFavoriteNumber;

    function store(uint number) external {
        console.log("Storing number %s", number);

        s_lastStoredFavoriteNumber = number;
        s_addressToFavoriteNumber[msg.sender] = number;
    }

    function retrieve() public view returns (uint256) {
        return s_addressToFavoriteNumber[msg.sender];
    }
}
