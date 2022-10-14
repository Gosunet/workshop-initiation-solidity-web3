author: Jonathan Lagneaux & Guillaume Lamanda
summary: Initiation solidity et web3
id: inititation-solidity-web3
categories: codelab,markdown
environments: Web
status: Draft
feedback link: https://github.com/Gosunet/workshop-initiation-solidity-web3
analytics account: Google Analytics ID

# Initiation solidity and Web3.0



## Init your project 🔨
Duration: 0:05:00

If you have not done it yet, you can start by cloning this repo
```sh
git clone https://github.com/Gosunet/workshop-initiation-solidity-web3.git
```

### Setup Hardhat

[Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start) is a framework that will help us to:
- compile our smart contract
- test our smart contract
- deploy our smart contract

If you feel adventurous you can alternatively use [Truffle](https://trufflesuite.com/docs/) or [Fundry](https://github.com/foundry-rs/foundry). Both are pretty similar to Hardhat in term of features.

Install Hardhat 
```sh
yarn workspace src add -D hardhat
```

> if you need to install yarn before `npm install --global yarn`

Then init hardhat in your `package/src` folder 
```sh
yarn hardhat
```

This will create folders :

- `contracts` : folder for our solidity files,

- `scripts` : a directory that contain scripts to handle deploy, run, ...

- `test`: unit test sources,

- `hardhat-config.js` : config file for Hardhat

Finally, run `yarn hardhat node` and this should print out a bunch of accounts.

Hardhat will generate some files for you, to make sure everything is working, run:

```sh
 yarn hardhat compile
```

Then run:

```sh
 yarn hardhat test
```

You should see a bunch of tests succeeded 🎉

You can now delete Lock.js under test, deploy.js under scripts and Lock.sol under contracts. (not the folder!)

## Write your first smart contract 🆕
Duration: 0:20:00


Now that we have setup Hardhat let's create our first smart contract!  
To do so let's create a new file `MyEpicSmartContract.sol` under `contracts` folder.  
Be careful file structure is important!

Copy this into your newly created file

```javascript
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract MyEpicSmartContract {
    constructor() {
        console.log("Hello World !");
    }
}
```


> If you use visual code you can install the [solidity extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity&utm_source=buildspace.so&utm_medium=buildspace_project) for syntax highlighting.


Congratulation you have officialy write your first smart contract 🥳  
Easy no?

Next step is to compile our smart contract, to do so run `yarn hardhat compile`.

Now it's our turn to work!  
Let's create a small function to set an attribute `name` into our smart contract. Then another function `sayHello` that will simply use the name you just set and print `Hello ${name}` in console.  
Here is a link to the [solidity doc](https://docs.soliditylang.org/en/v0.8.12/introduction-to-smart-contracts.html) to help you with that.

### A script to run our contract 

Hardhat allow us to deploy our smart contract in a local blockchain, and it allow us to do it very easily.

We juste have to write a small script to do that, so let's go!

Create a file `run.mjs` under `scripts`.

```javascript
const contractFactory = await hre.ethers.getContractFactory('MyEpicSmartContract');
const contract = await contractFactory.deploy();
await contract.deployed();
console.log("Contract deployed to:", contract.address);

// Call the function.
let txn = await contract.setName("Guillaume")
// Wait for it to be finished.
await txn.wait()
// Call another function
await contract.sayHello()
```

To call your script just run `yarn hardhat run scripts/run.mjs`.

You should get something like that!

```bash
Hello World !
Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Hello Guillaume
```

`0x5FbDB2315678afecb367f032d93F642f64180aa3` here is the contract adresse in our local blockchain where the contract was deployed.


## Create a contract that mints NFTs 🦆
Duration: 0:20:00

It's all fun and stuff but our contract is not doing anything usefull for our use case.

Let's change that! What we want is a contract that enable us to `mint` an NFT. Mint just mean to create our NFT in the blockchain.

But what's an NFT ? On the EVM compatible blockchain an NFT is "just" an [ERC-721 token](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/), that mean that our smart contract should implement the ERC-721 interface!

That's a lot of work. Fortunatly for us in Solidity we can use inherance and there are open-source contract available that we can inherit from to do that! [OpenZeppelin](https://github.com/OpenZeppelin) is probably the most know for that, is popular, used by a lot a people, and secure (at least it as been audited strongly and used in the real world without flaws).

We first need to add the openzeppelin dependency.

```bash
yarn add @openzeppelin/contracts
```

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


## Test it !
Duration: 0:20:00


## Deploy your smart contract 🚀
Duration: 0:20:00


### Get a Wallet ! And some ETH 💰


### Deploy



## Configure your front to connect a Wallet 💰
Duration: 0:30:00


## Integrate and interact with your smart contract
Duration: 0:15:00


## Bonus
Duration: 0:15:00



