# Salt Asset Manager Repository

## Introduction

The asset manager repository is a starter pack for Salt asset managers.
By using our software, you can propose transactions to Salt accounts where you are an authorized signer.

## Pre-requisites

### Technical pre-requisites

Node.js is a required dependency to be able to install and run the asset manager repository. [Install Node.js](https://nodejs.org/en/download/package-manager).

### Other pre-requisites

1. A completely set up organisation on [testnet.salt.space](https://testnet.salt.space) with a funded account.
2. One of the account's signers private key (add private key in .env file).

## Set up the Asset Manager Repository

1. clone the repo to your local machine
2. npm install
3. rename .env.sample to .env and set the private key variable to the private key of the account you want to manage assets from. You must be a signer on this account.
4. set BROADCASTING_NETWORK_RPC_NODE_URL, and BROADCASTING_NETWORK_ID to the broadcasting network of your choice from the [supported networks list](#supported-broadcasing-networks) below.

## Start the Asset Manager Bot

1. npm start
2. follow the instructions printed on the command line

## ORCHESTRATION VS BROADCASTING (please read)

You might have seen the terms "orchestration network" or "broadcasting network" being thrown around in this doc, below is the explanation:

### Orchestration Network

Salt's software is built on top of an dMPC protocol, due to the protocol's decentralized nature, account signers need to coordinate their actions together.
Thus, the need for a storage layer to act as an intermediary between the different signers. In the case of Salt the intermediary is a smart contract, it "orchestrates" signing activities for an account.

Orchestration smart contracts (1 per account) live on Arbitrum Sepolia or Arbitrum One (depending where you're using Salt).

### Broadcasting Network

The broadcasting network simply refers to the network on which you wish to execute the transaction.

## Supported Broadcasting Networks

As of now Salt supports the following networks to broadcast transactions:

- Ethereum Sepolia
- Base Sepolia
- Moonbase Alpha
- Polygon Amoy
- Somnia Shannon
- HyperEVM Testnet

## Important Considerations

The orchestration network cannot be changed. Salt uses Arbitrum for account orchestration.

The RPC nodes supplied by default in the .env.sample file are free nodes. The repository has been tested using these nodes. You may want to switch to paid nodes to improve your experience.

If you wish to broadcast on a network that is not supported in the list, please contact the Salt team on [Discord](https://discord.gg/UhDUBW9ymM).

## Notes

This repository is meant to serve as a starter pack for testing purposes, we encourage you to try the code, improve it, and propose changes.
