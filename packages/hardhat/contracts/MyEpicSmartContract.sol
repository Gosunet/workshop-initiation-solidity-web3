// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { Base64 } from "./libraries/Base64.sol";

contract MyEpicSmartContract is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;


  event NewNFTMinted(address sender, uint256 tokenId);
  // We need to pass the name of our NFTs token and it's symbol.
  constructor() ERC721 ("CryptoDuck", "DUCK") {
    console.log("This is my NFT contract. Woah!");
  }

  function makeAnEpicNFT(string memory srcTokenUri) public { 

    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    // Get all the JSON metadata in place and base64 encode it.
    string memory json = Base64.encode(
      string(
        abi.encodePacked(
          '{"name": "Crypto Duck", "description": "A magnificent crypto duck.", "image": "', srcTokenUri, '"}'
        )
      )
    );

    // Just like before, we prepend data:application/json;base64, to our data.
    string memory finalTokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );
    // Set the NFTs data.
    _setTokenURI(newItemId, finalTokenUri);

    _tokenIds.increment();
    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

    emit NewNFTMinted(msg.sender, newItemId);
  }
}
