author: Jonathan Lagneaux & Guillaume Lamanda
summary: Initiation solidity et web3
id: inititation-solidity-web3
categories: codelab,markdown
environments: Web
status: Draft
feedback link: https://github.com/Gosunet/workshop-initiation-solidity-web3
analytics account: Google Analytics ID

# Initiation solidity and Web3.0


Let's learn how a Smart Contract contract works! ⛵️

During this workshop you will :
- create your first Solidity smart contract
- test our contract
- deploy it on a real blockchain
- integrate and interact with it in a small react application using web3.js

To make this workshop more fun we will use a small site made by Zenika that allow us to customize a duck 🦆 https://pimpmyduck.zenika.com/.


What we want to do here is to create an NFT based on our custom duck! That will make us explore all the things we list above. 🙌

## Init your project 🔨
Duration: 0:05:00

If you have not done it yet, you can start by cloning this repo
```sh
git clone https://github.com/Gosunet/workshop-initiation-solidity-web3.git
```

If we take a look at the structure, we can notice it's a monorepo using yarn workspaces.  

At the root, you can see a folder name `packages`. In this folder we have separated packages.

We will focus on two packages today: `app` and `hardhat`.

The first contains our frontend, and the second will contains our contract.

Now we've seen that, let's start building! 🚀


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

Then import them in our contract like that

```javascript
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
```

As you can see we also import `Counters.sol`, this will help us to generate our NFT id.

Now that we have imported the contract `ERC721URIStorage` what we need to do now is to make our contract inherit from it.

To do that it's pretty simple !

```javascript
// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract MyEpicSmartContract is ERC721URIStorage {

  // We need to pass the name of our NFTs token and it's symbol.
  constructor() ERC721 ("CryptoDuck", "DUCK") {
    console.log("This is my NFT contract. Woah!");
  }
```

You will see that here we need to call the `ERC721` contract constructor with two string, one for the name of our NFT token, and the other one for the symbol of our collection.

Feel free to name it as you want 😉

Now we can use the `ERC721` contract method !  
Let's create our mehtode that we will call to create our NFT that will represente our custom duck.  
We don't want to store the whole duck SVG in our contract because storage in the blockchain cost money 💰 so we will only store the url to access to our duck SVG. 

> Remember that data in the blockchain are immutable, this is why it's important that our url will be accessible FOREVER ! That's why it's strongly recommended to stare our image in a decentralized store file systeme like IPFS.


```javascript
function makeAnEpicNFT(string memory srcTokenUri) public { 

}
```

Each of our NFT will need an unique ID to do that we will use the `Counters.sol` we have imported.

Add this in your contract 

```javascript
using Counters for Counters.Counter;
Counters.Counter private _tokenIds;
```

Let's code our contract to mint an NFT now !

First we want to get the currrent ID for your new NFT

```javascript
uint256 newItemId = _tokenIds.current();
````

Then we will mint our NFT calling the methode from the OpenZeppelin contract (all internal methode are prefix with an undescrore)

```javascript
_safeMint(msg.sender, newItemId);
```

Notice `msg.sender` here, it's a magic solidity variable that hold the address of the wallet that call this methode.

We want our NFT to avec an image, to do that we will create a `payload` that respect some convention used to parse NFT, doing that our NFT will be readable in marketplace like [OpenSea](https://opensea.io/). We also want our payload to be as tiny as possible, that's why we will encode it in base64.

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

Feel free again to change the name or description of our Duck. Maybe you can have an dynamic name and description ? Use a name set in the front end ? 

In order to be able to use the `Base64.encode` we need to add the Base64 library to our project.  
Create a `libraries` package under `contracts` and create a file `Base64.sol` in it. You can find the content of this file here [here](https://github.com/BlockChainCaffe/Base64.sol/blob/main/contracts/base64.sol).  
After that import the library in our contract file.

```javascript
import { Base64 } from "./libraries/Base64.sol";
```

Finally we need to set the date to the NFT


```javascript
// Set the NFTs data.
_setTokenURI(newItemId, finalTokenUri);

console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
```

And increment the counter

```javascript
// Increment the counter for when the next NFT is minted.
_tokenIds.increment();
```

One thing that we can do is to emit an Event, the front will be able to listen to that Event and show some stuff to the user.

To do that declare a new Event in our contract 

```javascript
event NewNFTMinted(address sender, uint256 tokenId);
```

and emit it at the end of your `makeAnEpicNFT` methode.

```javascript
emit NewNFTMinted(msg.sender, newItemId);
```

At the end you should get something like that

```javascript
function makeAnEpicNFT(string memory srcTokenUri) public {
    require(balanceOf(msg.sender) == 0, 'Each address may only own one crypto duck');
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

That's cool and stuff but how can I test my code ? Let's see that in the next chapter !


## Test it !
Duration: 0:20:00



## Deploy your smart contract 🚀
Duration: 0:20:00


### Get a Wallet ! And some ETH 💰


### Deploy



## Frontend setup ⚙️
Duration: 0:05:00

Ok, we worked on a smart contract. It's a lot of fun, but we have only a part of the job.
What is the point of having a smart contract if nobody use it, right?

That's why we are now building a frontend. Not all the frontend, since we just want to build a web3 integration
on top of the [existing CrytoDuck made but our Zenika Teammate](https://pimpmyduck.zenika.com/).

The frontend is made in React, but don't worry if you don't know. 
We built for you the base components, you will just filled them. Doing that, we can focus 
on what really matter here: interacting with the blockchain ⛓

As we seen in introduction, we will work on `app` package.

First, let's start the front with `yarn start`. 
The interface should open on `http://localhost:3000/`, and you already have an functional application
to customize a duck, how cool is that?

What we want to do in this interface is:

- Connect our wallet to be able to interact with the wallet,
- Add a `mint` button to let the user create an NFT from his custom duck. 

To interact with the blockchain, we need few additional dependencies, let's install them,
and them build some great stuff ✨

In the `app` folder, do the following command:

```sh
yarn add @web3-react/core @web3-react/injected-connector web3 
```

Those packages will be the tools we need to interact with the wallet, and by that, the blockchain.

Packages under `@web3-react/*` are abstractions on top of the `web3` library. It give us 
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
import Web3 from 'web3'
```

Then, wrap the whole JSX code in the `return` block by the web3 provider:

```tsx
  // ...
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3(provider)}>
      <div className={styles.app}>
        {/* ... */}
     </div>
    </Web3ReactProvider>
  )
```

Note the provider take a property (commonly called `prop` in react) `getLibrary`.  
It is mandatory to initiate the web3 library we want to use. This make `react-web3` agnostic of your
client library.  
Here, we pass a function to initialize `Web3`, the library commonly used.

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
Those variable are network configuration. We've put them for you, but know you can find them on [chainlist](https://chainlist.org/).

Then, we have a empty component. For now, it does not contain any logic, but some UI. 
Here we can start working 💪.

The fist step here is to remove the `return null` statement. You should now see the connect button display on the 
interface.

We've put a static variable `active` to `false`. We want to get this value from the wallet instead. 
For that, we will call the `useWebReact` hook. This hook return an object containing an `active` property. 
Perfect, this is exactly what we want! 

```tsx
  const { active } = useWeb3React<Web3>()
```

Ok, now we know if we are connected directly from the wallet, nice.
But, as we are not connected, we want to handle the connection. 
For that, the goal is to fill the `connect` function.  

From the hook, we will get an additional property: `activate`

```tsx
  const { active, activate } = useWeb3React<Web3>()
```

If we take a look at the activate signature, we can see it takes an argument `injected`. 
WTF is that?! 😱

It is informations about the chains our application is able to use. 
Chains informations make sense now!

We are going to declare a new variable `injected`, by instantiating a new `InjectedConnector`.  
The constructor take an object, with the property `supportedChainIds`.

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
So if you don't already have on, download the [metamask extension on 
chrome web store](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=fr).

You will be guided on the setup phase by Metamask. When this part is done,
switch to Goerly network. It is a testing network. 

Now you're all set, let's go clicking our connect button. 
You should see a pop-up asking you to approve the connection to our website.
If you accept, you should then see your address instead of the login button. 

Awesome!

If you wonder what's under the button, you can look for `Web3WalletButton`.  
It calls the hook `useWeb3React`, and get the connected address, and the active props.

From the `active` props, we decide what we display: a truncated address or a connection button.

The parent component `Web3WalletConnector` display an additional logout button when we are connected.

We still have to complete the disconnect behavior. 

From the `useWeb3React`, get an other property: `disconnect`. It is a function. Call it from the 
disconnect function, and we are good! Good Job! 🙌

## Integrate and interact with your smart contract
Duration: 0:15:00




## Bonus
Duration: 0:15:00



