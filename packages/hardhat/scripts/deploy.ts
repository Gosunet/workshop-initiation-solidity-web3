import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("MyEpicSmartContract");
  await contract.waitForDeployment();

  console.log(`Contract deployed to : ${await contract.getAddress()}`);

  const svg = "https://theduckgallery.zenika.com/ducks/jeanphibaconnais.png";
  const tx = await contract.makeAnEpicNFT(svg);
  await tx.wait();
  console.log("Minted NFT #1");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
