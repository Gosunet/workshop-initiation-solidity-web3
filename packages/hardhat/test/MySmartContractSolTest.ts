import { expect } from 'chai';
import { ethers } from "hardhat";

describe('MyEpicSmartContract contract', function () {
  it('Should emit NewNFTMinted', async function () {
    const [owner] = await ethers.getSigners()

    const nftContractFactory = await ethers.getContractFactory(
      'MyEpicSmartContract',
    )
    const nftContract = await nftContractFactory.deploy()
    await nftContract.deployed()
    console.log('Contract deployed to:', nftContract.address)

    const svg = 'https://theduckgallery.zenika.com/ducks/jeanphibaconnais.png'

    await expect(nftContract.makeAnEpicNFT(svg))
      .to.emit(nftContract, 'NewNFTMinted')
      .withArgs(owner.address, 0) // first item
  })
})
