author: Jonathan Lagneaux & Guillaume Lamanda
summary: Initiation solidity et web3
id: initiation-solidity-web3
categories: codelab, markdown
environments: Web
status: Draft
feedback link: https://github.com/Gosunet/workshop-initiation-solidity-web3
analytics account: Google Analytics ID

# Initiation solidity and Web3.0

## Introduction
Duration: 0:05:00

Welcome in this initiation Solidity and Web3! Let's learn how a Smart Contract contract works! ⛵️

We think those technologies are really empowering, and open a brend new world of possibilities
of what we can achieve as developers. It also brings more power into the hands of the user.

We've made this project to have a better understanding of the NFT trend, and also to get our hand dirty.  

Now you will too 😜

During this workshop you will:

- create your first Solidity smart contract
- test our contract
- deploy it on a real blockchain
- integrate and interact with it in a small react application using web3.js

To make this workshop more fun we will use a [ small site made by Zenika ](https://pimpmyduck.zenika.com/) that allows us to customize a duck 🦆 .

What we want to do here is to create an NFT based on our custom duck! That will make us explore all the things we list above. 🙌

Are you ready? Let's go! 🚀

## Init your project 🔨
Duration: 0:05:00

If you have not done it yet, you can start by cloning this repo
```sh
git clone https://github.com/Gosunet/workshop-initiation-solidity-web3.git
```

If we take a look at the structure, we can notice it's a monorepo using yarn workspaces.  

At the root, you can see a folder name `packages`. In this folder, we have separated packages.

We will focus on two packages today: `app` and `hardhat`.

The first contains our frontend, and the second will contains our contract.

Now we've seen that, let's start building! 🚀


### Setup Hardhat

[Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start) is a framework that will help us to:
- compile our smart contract
- test our smart contract
- deploy our smart contract

If you feel adventurous you can alternatively use [Truffle](https://trufflesuite.com/docs/) or [Fundry](https://github.com/foundry-rs/foundry). Both are pretty similar to Hardhat in terms of features.

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
- `scripts` : a directory that contains scripts to handle deployment, run, ...
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

You can now delete Lock.js under test, deploy.js under scripts and `Lock.sol` under contracts. (not the folder!)

## Write your first smart contract 🆕
Duration: 0:20:00


Now that we have set up Hardhat let's create our first smart contract!  
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


Congratulation you have officially written your first smart contract 🥳  
Easy no?

The next step is to compile our smart contract, to do so run `yarn hardhat compile`.

Now it's our turn to work!  
Let's create a small function to set an attribute `name` into our smart contract. Then another function `sayHello` will simply use the name you just set and print `Hello ${name}` in the console.  
Here is a link to the [solidity doc](https://docs.soliditylang.org/en/v0.8.12/introduction-to-smart-contracts.html) to help you with that.

### A script to run our contract 

Hardhat allows us to deploy our smart contract in a local blockchain, and it allows us to do it very easily.

We just have to write a small script to do that, so let's go!

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

`0x5FbDB2315678afecb367f032d93F642f64180aa3` here is the contract address in our local blockchain where the contract was deployed.


## Create a contract that mints NFTs 🦆
Duration: 0:20:00

It's all fun and stuff but our contract is not doing anything useful for our use case.

Let's change that! What we want is a contract that enables us to `mint` an NFT. Mint just means to create our NFT in the blockchain.

But what's an NFT? On the EVM-compatible blockchain, an NFT is "just" an [ERC-721 [token](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/), which means that our smart contract should implement the ERC-721 interface!

That's a lot of work. Fortunately for us in Solidity, we can use inheritance and there are open-source contracts available that we can inherit from to do that! [OpenZeppelin](https://github.com/OpenZeppelin) is probably the most know for that, is popular, used by a lot of people, and secure (at least it has been audited strongly and used in the real world without flaws).

We first need to add the OpenZeppelin dependency.
In the `harhdat` folder run:

```bash
yarn add @openzeppelin/contracts
```

Then import them in our contract like that:

```javascript
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
```

As you can see we also import `Counters.sol`, this will help us to generate our NFT id.

Now that we have imported the contract `ERC721URIStorage` what we need to do now is to make our contract inherit from it.

To do that it's pretty simple!

```javascript
// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract MyEpicSmartContract is ERC721URIStorage {

  // We need to pass the name of our NFTs token and it's symbol.
  constructor() ERC721 ("CryptoDuck", "DUCK") {
    console.log("This is my NFT contract. Woah!");
  }
```

You will see that here we need to call the `ERC721` contract constructor with two strings, one for the name of our NFT token, and the other one for the symbol of our collection.

Feel free to name it as you want 😉

Now we can use the `ERC721` contract method!  
Let's create the method that we will call to create our NFT that will represent our custom duck.  
We don't want to store the whole duck SVG in our contract because storage in the blockchain costs money 💰 so we will only store the URL to access our duck SVG. 

> Remember that data in the blockchain are immutable, this is why it's important that our url will be accessible FOREVER ! That's why it's strongly recommended to stare our image in a decentralized store file systeme like IPFS.


```javascript
function makeAnEpicNFT(string memory srcTokenUri) public { 

}
```

Each of our NFTs will need a unique ID to do that we will use the `Counters.sol` we have imported.

Add this to your contract:

```javascript
using Counters for Counters.Counter;
Counters.Counter private _tokenIds;
```

Let's code our contract to mint an NFT now!

First, we want to get the current ID for your new NFT.

```javascript
uint256 newItemId = _tokenIds.current();
````

Then we will mint our NFT calling the method from the OpenZeppelin contract (all internal methods are prefixed with an underscore)

```javascript
_safeMint(msg.sender, newItemId);
```

Notice `msg.sender` here, it's a magic solidity variable that holds the address of the wallet that calls this method.

We want our NFT to have an image, to do that we will create a `payload` that respects some convention used to parse NFT, doing that our NFT will be readable in a marketplace like [OpenSea](https://opensea.io/). We also want our payload to be as tiny as possible, that's why we will encode it in base64.

```javascript
// Get all the JSON metadata in place and base64 encode it.
string memory json = Base64.encode(
    bytes(
        string(
            abi.encodePacked(
                '{"name": "Crypto Duck", "description": "A magnificent crypto duck.", "image": "', srcTokenUri, '"}'
            )
        )
    )
);

// Just like before, we prepend data:application/json;base64, to our data.
string memory finalTokenUri = string(
    abi.encodePacked("data:application/json;base64,", json)
);
```

Feel free again to change the name or description of our Duck. Maybe you can have a dynamic name and a description? Use a name set in the frontend? 

To be able to use the `Base64.encode` we need to add the Base64 library to our project.  
Create a `libraries` package under `contracts` and create a file `Base64.sol` in it. You can find the content of this file [here](https://github.com/BlockChainCaffe/Base64.sol/blob/main/contracts/base64.sol).  
After that import the library into our contract file.

```javascript
import { Base64 } from "./libraries/Base64.sol";
```

Finally, we need to set the date to the NFT


```javascript
// Set the NFTs data.
_setTokenURI(newItemId, finalTokenUri);

console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
```

and increment the counter.

```javascript
// Increment the counter for when the next NFT is minted.
_tokenIds.increment();
```

One thing that we can do is to emit an Event, the front will be able to listen to that Event and show some stuff to the user.

To do that declare a new Event in our contract 

```javascript
event NewNFTMinted(address sender, uint256 tokenId);
```

and emit it at the end of your `makeAnEpicNFT` method.

```javascript
emit NewNFTMinted(msg.sender, newItemId);
```

At the end you should get something like that:

```javascript
function makeAnEpicNFT(string memory srcTokenUri) public {
    // Get the current tokenId, this starts at 0.
    uint256 newItemId = _tokenIds.current();

     // Actually mint the NFT to the sender using msg.sender.
    _safeMint(msg.sender, newItemId);

    // Get all the JSON metadata in place and base64 encode it.
    string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    '{"name": "Crypto Duck", "description": "A magnificent crypto duck.", "image": "', srcTokenUri, '"}'
                )
            )
        )
    );

    // Just like before, we prepend data:application/json;base64, to our data.
    string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", json)
    );

    // Set the NFTs data.
    _setTokenURI(newItemId, finalTokenUri);

    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();

    emit NewNFTMinted(msg.sender, newItemId);
  }
```

That's cool and stuff but how can I test my code? Let's see that in the next chapter!


## Test it!
Duration: 0:20:00

To test our smart contract we can update the `run.mjs` script to create our contract then call our new method `makeAnEpicNft`.

```javascript
const nftContractFactory = await hre.ethers.getContractFactory('MyEpicSmartContract');
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
```

Here we used a png that is not stored in decentralized storage, but it's just for the test so it's not a problem, you can use any png.

Is it working? 🎉

That's nice but I think we can have better a test, can we unit-test our contract? YES, we can!

Let's create a `MySmartContractSolTest.js` file under the package `test`

We can test that we emit our `NewNFTMinted` event. It's pretty much the same code that the `run.mjs` with some tests at the end.  

Here is the code:

```javascript
const { expect } = require('chai')

describe('MyEpicSmartContract contract', function () {
  it('Should emit NewNFTMinted', async function () {
    const [owner] = await ethers.getSigners()

    const nftContractFactory = await hre.ethers.getContractFactory(
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
```

We basically:
- `deploy` the contract on Hardhat test chain
- call the method `makeAnEpicNFT`
- and expect an event to be fire, using chai `expect`

To run it:

```javascript
yarn hardhat test
```

Awesome we now have our smart contract tested 😎


## Deploy your smart contract 🚀
Duration: 0:20:00

Now that we have a working smart contract we want to deploy it on a real blockchain! So let's go 🚀


### Get a Wallet! And some ETH 💰

To deploy our smart contract we will need some Ethereum. Don't worry we will use the Goerli testnet of Ethereum so this will not cost us a penny!

So if you don't already have a wallet, download the [metamask extension on 
chrome web store](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=fr).

You will be guided on the setup phase by Metamask. When this part is done,
switch to `Goerly network`, you should be on the Ethereum mainnet at first. If you don't see the `Goerly network` click on "Show/hide testnet".

Once it's done you will see that you have 0 GoerliETH 😢

So in order to get some GoerliETH you will have to request some in a faucet.

This one should work https://goerlifaucet.com/, you gonna need to create an Alchemy account though but we will need one right after so do create one and request our GoerliETH. To request your eth just copy and paste in the input our public key address from metamask (the one that looks like 0xf20...4D8 when you open it).

If you got some eth let's go to the next part 🔥

### Deploy

Deploying our contract is pretty much like running it with the `run.mjs` script thanks to Hardhat. 

So let's create a new script `deploy.mjs`:

```javascript
const nftContractFactory = await hre.ethers.getContractFactory('MyEpicSmartContract');
const nftContract = await nftContractFactory.deploy();
await nftContract.deployed();
console.log("Contract deployed to:", nftContract.address);

const svg = 'https://theduckgallery.zenika.com/ducks/jeanphibaconnais.png'

// Call the function.
let txn = await nftContract.makeAnEpicNFT(svg)
// Wait for it to be mined.
await txn.wait()
console.log("Minted NFT #1")
```

Now we have some setup to do.

First, you need to update your `hardhat.config` file.
We need to add a new network, here Goerly, add this in the `module.export`: 

```javscript
networks: {
    goerli: {
      url: process.env.STAGING_ALCHEMY_KEY_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
```

Each time you want to deploy to a specific network you will need to add it like that in our Hardhat config. Pretty easy no?  
You can deploy to every EVM-compatible blockchain like that, even a blockchain like Avalanche 😉

You have surely noticed the `process.env`.STAGING_ALCHEMY_KEY_URL` and `process.env.PRIVATE_KEY` values.

Add the `PRIVATE_KEY` value in a `.env` file, to get the value of our private key, go to metamask, click on the 3 dots next to our account, go to detail then click on "export private key".  
⚠️⚠️⚠️ You should never share this key with anyone! Otherwise, some bad-intentioned people can still our account, and all that is within it!

To get the `STAGING_ALCHEMY_KEY_URL` you need to log in to [Alchemy](https://dashboard.alchemy.com/) and then create a new 'app' with the create app button. You will be asked to choose a name, a description and a chain, do as you like for the name and description and choose the Ethereum chain with Goerli network, you will get an HTTPS URL, this is our `STAGING_ALCHEMY_KEY_URL` that you need to add in your `.env` file.  
The alchemy app will act as a node to the Ethereum Goerli network to interact with the blockchain.


Now that you set all the variables we need to add the `dotenv` dependency, in the `hardhat` folder run:

```bash
yarn add -D dotenv 
```

Then add the import on top of your Hardhat config file:

```javascript
require('dotenv').config();
```

Finally, run:

```bash
yarn hardhat run scripts/deploy.mjs --network goerli
```

You should get something like that:

```bash
Contract deployed to: 0x30382c5d151FFE1837c6BB0a1fdFaBc07FD0b67A
Minted NFT #1
```

Awesome you have deployed your first smart contract in the real world! And mint an NFT.

Now, head to https://testnets.opensea.io/.
Create this URL: https://testnets.opensea.io/assets/goerli/INSERT_DEPLOY_CONTRACT_ADDRESS_HERE/TOKEN_ID

Mine is: https://testnets.opensea.io/assets/goerli/0x30382c5d151FFE1837c6BB0a1fdFaBc07FD0b67A/0 (id start at 0!)

And you should see your first duck NFT 🎉

Opensea can take up to 15min to refresh so don't worry if you didn't see your NFT right away.

It's EPIC, but kinda boring it's the same SVG. Let's interact with it and create our duck!


## Frontend setup ⚙️
Duration: 0:05:00

Ok, we worked on a smart contract. It's a lot of fun, but we have only a part of the job.
What is the point of having a smart contract if nobody used it, right?

That's why we are now building a frontend. Not all the frontend, since we just want to build a web3 integration
on top of the [existing CrytoDuck made but our Zenika Teammate](https://pimpmyduck.zenika.com/).

The frontend is made in React, but don't worry if you don't know. 
We built for you the base components, you will just fill them. By doing that, we can focus on what really matters here: interacting with the blockchain ⛓

As we saw in the introduction, we will work on `app` package.

First, let's start the front with `yarn start`. 
The interface should open on `http://localhost:3000/`, and you already have a functional application
to customize a duck, how cool is that?

What we want to do in this interface is:

- Connect our wallet to be able to interact with the wallet,
- Add a `mint` button to let the user create an NFT from his custom duck. 

To interact with the blockchain, we need a few additional dependencies, let's install them,
and then build some great stuff ✨

In the `app` folder, do the following command:

```sh
yarn add @web3-react/core @web3-react/injected-connector ethers @ethersproject/providers 
```

Those packages will be the tools we need to interact with the wallet, and by that, the blockchain.

Packages under `@web3-react/*` are bridge between react and client libraries such `ethers` 
(we are using) or `web3` library. It give us 
friendly tools to get a reactive state in react components.

Now your probably want to yell at us: "GIVE ME SOME CODE!". We're getting there, don't worry 😉

## Configure your front to connect a Wallet 💰
Duration: 0:25:00

### Context instantiation

As we saw, you add some dependencies to interact with the blockchain. 
This dependency needs to instantiate a `Context` to share the state with the whole app.
So the first modification we have to make is in the `App.ts` component. 

First import the context `Provider` and the web3 library:

```tsx
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
```

Then, wrap the whole JSX code in the `return` block by the web3 provider:

```tsx
  // ...
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
      <div className={styles.app}>
        {/* ... */}
     </div>
    </Web3ReactProvider>
  )
```

Note the provider takes a property (commonly called `prop` in react) `getLibrary`.  
It is mandatory to initiate the web3 library we want to use. This makes `react-web3` agnostic of your
client library.  
Here, we pass a function to initialize `Web3Provider` from `ethers`, the library commonly used.

Great! Now we are able to discuss with the wallet in our React components!

### Connect to a wallet

The next code to update will be the `Web3WalletConnector`.
This component will configure handle all the connection logic. In that, we will find: 

- The chain configuration,
- Displaying a connection button the user is not connected,
- or a disconnect button for the opposite case,
- ask the user to change his wallet network if it is connected to the wrong chain.

Let's see what we have for now. 

You can see some constants already declared: `AVALANCHE_TESTNET_PARAMS` and `ETHEREUM_TESTNET_PARAMS`.
Those variables are network configuration. We've put them for you, but know you can find them on [chainlist](https://chainlist.org/).

Then, we have an empty component. For now, it does not contain any logic, but some UI. 
Here we can start working 💪.

The first step here is to remove the `return null` statement. You should now see the connect button displayed on the 
interface.

We've put a static variable `active` to `false`. We want to get this value from the wallet instead. 
For that, we will call the `useWebReact` hook. This hook returns an object containing an `active` property. 
Perfect, this is exactly what we want! 

```tsx
  const { active } = useWeb3React<Web3Provider>()
```

Ok, now we know if we are connected directly from the wallet, nice.
But, as we are not connected, we want to handle the connection. 
For that, the goal is to fill the `connect` function.  

From the hook, we will get an additional property: `activate`

```tsx
  const { active, activate } = useWeb3React<Web3Provider>()
```

If we take a look at the activated signature, we can see it takes an argument `injected`. 
WTF is that?! 😱

It is information about the chains our application can use. 

Chains information makes sense now!

We are going to declare a new variable `injected`, by instantiating a new `InjectedConnector`.  
The constructor takes an object, with the property `supportedChainIds`.

```tsx
const injected = new InjectedConnector({
  supportedChainIds: [
    parseInt(ETHEREUM_TESTNET_PARAMS.chainId, 16),
    parseInt(AVALANCHE_TESTNET_PARAMS.chainId, 16),
  ],
})
```

Because this variable is not reactive, it can be defined outside our component.

Now we have all our `activate` dependencies, we can call our function in `connect` function.

```tsx
  async function connect() {
    await activate(injected)
  }
```

Time to test!

### Connection testing

To test a wallet connection, you need to first have a Wallet.  
You should already have one so, let's go click our connect button.   
You should see a pop-up asking you to approve the connection to our website.
If you accept, you should then see your address instead of the login button. 

Awesome!

If you wonder what's under the button, you can look for `Web3WalletButton`.  
It calls the hook `useWeb3React`, and gets the connected address, and the active props.

From the `active` props, we decide what we display: a truncated address or a connection button.

The parent component `Web3WalletConnector` displayed an additional logout button when we are connected.

We still have to complete the disconnected behavior. 

From the `useWeb3React`, get another property: `disconnect`. It is a function. Call it from the 
disconnect function, and we are good! Good Job! 🙌

## Integrate and interact with your smart contract
Duration: 0:15:00

For now, we implemented the connection with our wallet. That's already great,
but we're here to interact with our smart contract right? Let's goooo 🧑‍💻

The frontend, and the web3 library needs to know what is the structure of our contract. 
This means:

- the public data exposed,
- public functions,
- events (yeah, the Ethereum Virtual Machine aka EVM has built-in support for events)

And there is a file containing all those information, 
produced on the smart contract build: the JSON artifact.

In the contract package, look for the `artifacts/contracts/` folder.
Find the file with the name of our contract, and take a look at the content.

It contains all the information our frontend needs. 🎉

OK, now we know what we have, let's think about what we want. 

The goal will be to actually mint our NFT, finally!  
To achieve that, we want to call our smart contract function `makeAnEpicNFT`, 
and listen to the event `NewNFTMinted`.  
From the event, we will get the token id, and display an URL to be able to see it.  

We have created for you the `Mint` component containing the structure so we can focus 
on the business logic. Take a look at this component.

We have two functions to fill: `setupEventListener` and `askContractToMintNft`.  
The first one will listen to the mint event on our contract, and the second will call our 
contract to mint the NFT.  

The component return `null` if `active` is `false`, and a button otherwise.  
This means if you are connected, the button should appear.

Let's go!

The first thing is to replace the `active` variable to get it from the `useWeb3React` hook.  
We already did it, so it should be easy 😛

Take also the `library` property from the hook, we will need it. It's better to give 
`Web3Provider` as a generic parameter to the hook. It will type the `library` property for us.

We take `library` here because we need it to call the blockchain.  

Let's code the event listener. It's the "easier" part, and we will be able to 
understand the basics.

### Event Listener

First, the variable `provider` can be `undefined`, so we need to verify it isn't.  

```ts
  const setupEventListener = useCallback(() => {
    if (!provider) {
      return
    }
  }
```

Then, because of the inherited behavior of `ethers` library, we need to get the transaction `signer`.  

```tsx
    const signer = provider.getSigner()
```

Secondly, we will create a contract client instance.  

```ts
    const connectedContract = new Contract(
      // ...
    )
```

This constructor takes 3 arguments:

- The contract address,
- The contract ABI (Application Binary Interface). It is a sub-part of the JSON artifact we talked about before,
- The `signer` variable we created before. It will be used to sign transactions.

Let's fill them one by one.  

On the top of the file, we've created a `CONTRACT_ADDRESS` constant to replace. Put here the contract address 
you got when you deployed your contract.  

For the ABI, it should be on the contract package. Let's copy the `CryptoDuck.json` in the `src` folder, 
and then import it.  

```bash
# this assume your shell location is in the root folder
cp packages/nft/artifacts/contracts/CryptoDuck.json packages/app/src
```

```tsx
import myEpicNft from '../abi/CryptoDuck.json'
```

And for the signers, we've created a variable for it, perfect!  

We should have this: 

```tsx
    const signer = provider.getSigner()
    const contract = new Contract(
      CONTRACT_ADDRESS,
      myEpicNft.abi,
      signer
    )
```

Now we have a contract client instance, we can interact with our contract!  
To listen to events, we need to call the `on` method and pass it our event name `NewNFTMinted` as the first parameter, and a callback as the second parameter.  
The first argument of the callback is the contract address, and the second is the return type 
of the method called (here the token id is a big number).

> ℹ️ to get the number of our token from a BigNumber, we need to call `toNumber` method on it.

Our UI will be simple. We will display an alert with the received informations.

```tsx
    contract.on('NewNFTMinted', (from, tokenId) => {
      console.log(from, tokenId.toNumber())
      alert(
        `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
      )
    })
```

> ℹ️ The `ethers` library used under the hood is not perfect here, and we loose our strong typing 😭

🙌 We have a listener set up! 🙌 But we can't test it without minting an NFT, so let's do that!

### LET'S MINT

Here we go! The final part!  

Here we will fill in the `askContractToMintNft` function. But this one has a bit much logic to handle.  

When the user will click on the button, it will fire our function.  
Our component only has an SVG HTML element reference. But we want our NFT to have an actual image!  
So the first step will be to create an image from the element we have.  

Then, we have to store it. But on the blockchain, we pay for every storage we use, and we don't 
want the mint to be overly expensive!

Here, we have 2 solutions.  
The first one: store our image in a traditional manner. Like an S3 bucket. But we want to create a 
decentralized application! What happens to our NFT if the S3 is deleted? We have only data, but no 
image attached to it. We will have a broken NFT.
The second one: store it on IPFS, a decentralized storage. It seems a lot better, right? 😁 
But IPFS has some issues too. It's a protocol, which means the user will have to install the protocol
on his computer to interact with or use a gateway. Which is centralized 😅

Here, we will use a gateway deployed on AWS. Some libraries allow us to run a minimal 
IPFS node in Javascript in the browser. It would be a better solution since doing that we don't 
have a single point of failure. Never mind, for our little project the gateway solution was fun!

Enough talk, let's code!

First, we will inform the UI we're doing some stuff and it needs to display a loader.  
We've received a `setIsLoading` method from props, so let's call it.  

```tsx
    setIsLoading(true)
```

Then, we will verify we do have an SVG element or throw an error otherwise.  

```tsx
    if (!svgRef.current) {
      throw new Error('No SVG')
    }
```

Now we're sure we have an SVG element, let's create an image from it.  
Thankfully, we've created a `getSvgImageFromSvgElement` function for you 🫡

```tsx
    const svg = await getSvgImageFromSvgElement(svgRef.current)
```

And let's upload it to IPFS. Here too, you have a `uploadToIPFS` function to make your life easier 🫡
This function takes an object parameter with 2 properties: `svg` and `name`

```tsx
    const cid = await uploadSvgToIPFS({
      svg,
      name: `nft ${new Date().toISOString()}`,
    })
```

Now we have a unique identifier for our stored image. Exactly what our contract needs 😁

We can call our contract. Remember the "get the signer", "create a contract instance" stuff?  
We will repeat it here. 

> - "Gnagnagna that's a code duplication" 
> YES IT IS! Two time duplication is ok, if this code was repeated 3,4,5 times, 
> we would have created an abstraction.

```tsx
    const signer = provider.getSigner()
    const connectedContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      myEpicNft.abi,
      signer
    )
```

Nooooooow, we can create a transaction 🔥

Before we was listening to an event, so we called `on` the method. Here to call a distributed method,
we can directly call the method directly on the contract instance.  

If your IDE does not autocomplete, it's normal, the contract does not infer our ABI, and it's really
sad 😭. 

```tsx
    const nftTxn = await connectedContract.makeAnEpicNFT(`ipfs://${cid}`)
```

Then we will wait for the transaction to be processed

```tsx
    await nftTxn.wait()
```

And inform the UI we have FINISHED 🎉

```tsx
    setIsLoading(false)
```

TIME TO TEST!

## Bonus
Duration: 0:15:00

As bonus, you can update the smart-contract to add new features.  
Feel free to invent one! The distributed technologies offers endless possibilities!

Here is few ideas:

- Restrict the mint to one NFT per user,
- Limit the total amount of ducks possibles (rarity),
- Store duck properties  
  This will allow another types of possibilities:
  - Have some inheritance ; a duck could inherit some properties of his parent,
  - Turn them into fighting ducks with combat properties,
  - etc...

We're not guiding you for the bonus, but feel free to reach out for help 🤜🤛

And at the end, tell us what you've made 🫶.

