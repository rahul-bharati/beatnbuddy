// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract BeatnBuddy {
    constructor() {}

    struct User {
        address uid;
        string name;
        uint256 created_at;
        string email;
        string avatar;
    }
}
