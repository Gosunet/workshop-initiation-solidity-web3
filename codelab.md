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

### Setup Hardat

[Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start) is a framework that will help us to :
- compile our smart contract
- test our smart contract
- deploy our smart contract

If you feel adventurous you can alternatively use [Truffle](https://trufflesuite.com/docs/) or [Fundry](https://github.com/foundry-rs/foundry). Both are pretty similar to Hardat in term of features.

Install Hardhat 
```sh
yarn workspace src add -D hardhat
```

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

You can now delete Lock.js under test, deploy.js under scripts and Lock.sol under contracts. (not the folder !)

## Write your first smart contract 🆕
Duration: 0:20:00


## Test it !
Duration: 0:20:00


## Deploy your smart contract 🚀
Duration: 0:20:00


## Create a contract that mints NFTs 🦆
Duration: 0:20:00


## Configure your front to connect a Wallet 💰
Duration: 0:30:00


## Integrate and interact with your smart contract
Duration: 0:15:00


## Bonus
Duration: 0:15:00



