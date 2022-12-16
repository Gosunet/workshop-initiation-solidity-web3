import { ethers } from "hardhat";

async function main() {
  const nftContractFactory = await ethers.getContractFactory('MyEpicSmartContract');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  const svg = "https://theduckgallery.zenika.com/ducks/jeanphibaconnais.png"

  // Call the function.
  let txn = await nftContract.makeAnEpicNFT(svg)
  // Wait for it to be mined.
  await txn.wait()

  // Mint another NFT for fun.
  txn = await nftContract.makeAnEpicNFT(svg)
  // Wait for it to be mined.
  await txn.wait()
}

main()
