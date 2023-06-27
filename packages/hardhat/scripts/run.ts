import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("MyEpicSmartContract");
  await contract.waitForDeployment();

  console.log(
    `Contract deployed to : ${await contract.getAddress()}`
  );
  const tx = await contract.setName("Sunny Tech");
  await tx.wait();
  await contract.sayHello();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
