// contracts/Sound.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title BeatnBuddy
/// @author Rahul Bharati
/// @notice Contract to list, retrieve sound NFTs

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BeatnBuddy is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _soundIds;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct BeatnBuddySound {
        uint256 soundId;
        address soundContract;
        uint256 tokenId;
        address payable owner;
    }

    mapping(uint256 => BeatnBuddySound) private idToBeatnBuddySound;

    event SoundCreated(
        uint256 indexed soundId,
        address indexed soundContract,
        uint256 indexed tokenId,
        address owner
    );

    function createSoundItem(address soundContract, uint256 tokenId)
        public
        payable
        nonReentrant
    {
        _soundIds.increment();
        uint256 soundId = _soundIds.current();
        idToBeatnBuddySound[soundId] = BeatnBuddySound(
            soundId,
            soundContract,
            tokenId,
            payable(msg.sender)
        );

        emit SoundCreated(soundId, soundContract, tokenId, msg.sender);
    }

    function getMySounds() public view returns (BeatnBuddySound[] memory) {
        uint256 totalCount = _soundIds.current();
        uint256 soundCount = 0;
        uint256 currentIndex = 0;
        for (uint256 count = 0; count < totalCount; count++) {
            if (idToBeatnBuddySound[count + 1].owner == msg.sender) {
                soundCount += 1;
            }
        }

        BeatnBuddySound[] memory sounds = new BeatnBuddySound[](soundCount);
        for (uint256 count = 0; count < totalCount; count++) {
            if (idToBeatnBuddySound[count + 1].owner == msg.sender) {
                uint256 currentSoundId = count + 1;
                BeatnBuddySound storage currentSound = idToBeatnBuddySound[
                    currentSoundId
                ];
                sounds[currentIndex] = currentSound;
                currentIndex += 1;
            }
        }

        return sounds;
    }

    function getSounds(bool limit)
        public
        view
        returns (BeatnBuddySound[] memory)
    {
        uint256 totalCount = _soundIds.current();
        uint256 itemsToReturn = _soundIds.current();
        if (limit == true) {
            itemsToReturn = 8;
        }
        BeatnBuddySound[] memory sounds = new BeatnBuddySound[](itemsToReturn);
        uint256 lastItemCount = totalCount - itemsToReturn;
        uint256 currentCount = 0;
        for (uint256 count = lastItemCount; count < totalCount; count++) {
            BeatnBuddySound storage currentSound = idToBeatnBuddySound[
                count + 1
            ];
            currentCount += 1;
            sounds[currentCount] = currentSound;
            currentCount += 1;
        }

        return sounds;
    }
}
