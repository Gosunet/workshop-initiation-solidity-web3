import { expect } from "chai";
import { ethers } from "hardhat";

describe('MyEpicSmartContract contract', function () {
  it('Should emit NewNFTMinted', async function () {
    const [owner] = await ethers.getSigners()

    const nftContract = await ethers.deployContract(
      'MyEpicSmartContract',
    )
    await nftContract.waitForDeployment()
    console.log('Contract deployed to:', await nftContract.getAddress())

    const svg = 'https://theduckgallery.zenika.com/ducks/jeanphibaconnais.png'

    await expect(nftContract.makeAnEpicNFT(svg))
      .to.emit(nftContract, 'NewNFTMinted')
      .withArgs(owner.address, 0) // first item
  })
})
