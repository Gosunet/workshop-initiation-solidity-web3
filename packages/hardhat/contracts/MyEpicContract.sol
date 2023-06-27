// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/Base64.sol";

using Counters for Counters.Counter;

contract MyEpicSmartContract is ERC721URIStorage {
    Counters.Counter private _tokenIds;
    event NewNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("CryptoDuck", "DUCK") {
        console.log("This is my NFT contract. Woah!");
    }

    function makeAnEpicNFT(string calldata srcTokenUri) public {
        uint256 newItemId = _tokenIds.current();

        string memory json = Base64.encode(
            string(
                abi.encodePacked(
                    '{"name": "Crypto Duck", "description": "A magnificent crypto duck.", "image": "',
                    srcTokenUri,
                    '"}'
                )
            )
        );
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalTokenUri);
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
        _tokenIds.increment();
        emit NewNFTMinted(msg.sender, newItemId);
    }
}
