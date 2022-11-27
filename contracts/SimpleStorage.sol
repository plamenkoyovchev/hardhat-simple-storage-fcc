// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 favoriteNumber;

    constructor() {
        favoriteNumber = 8;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}
