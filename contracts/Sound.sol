// contracts/Sound.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title Sound
/// @author Rahul Bharati
/// @notice This created NFT for the sound uploaded that may be music, song or podcast

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract Sound is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address soundCollectionAddress)
        ERC721("Beat & Buddy Token", "BNBT")
    {
        contractAddress = soundCollectionAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}
