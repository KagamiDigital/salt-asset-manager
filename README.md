# Salt Asset Manager Bot

## Introduction

The asset manager bot is a starter pack for Salt asset managers. By setting up this software, you can propose transactions to Salt accounts that you are an authorised signer on. The transaction proposal will be picked up by Salt's backend, which will initiate the signing flow.

## Pre-requisites

### Technical pre-requisites

Node.js is a required dependency to be able to install and run the asset manager bot. [Install Node.js](https://nodejs.org/en/download/package-manager).

### Business pre-requisites

A completely set up organisation on [testnet.salt.space](https://testnet.salt.space) with a funded account.

The bot will need to be set up as a co-signers on a Salt account. To do this, it will need access to MetaMask and the Chrome browser.

## Set up the Asset Manager Bot

1. clone the repo to your local machine
2. npm install
3. rename .env.sample to .env and set the private key variable to the private key of the account you want to manage assets from. You must be a signer on this account.
4. set BROADCASTING_NETWORK_RPC_NODE_URL, and BROADCASTING_NETWORK_ID to the broadcasting network of your choice from the [supported networks list](#supported-networks) below.

## Start the Asset Manager Bot

1. npm start
2. follow the instructions printed on the command line

### Notes

This repository is meant to serve as a starter pack for testing purposes, we encourage you to try the code, improve it, and propose changes.

## Supported Networks

As of now Salt supports the following networks to broadcast transactions:
- Ethereum Sepolia
- Base Sepolia
- Moonbase Alpha
- Polygon Amoy

### Important Considerations

The orchestration network cannot be changed. Salt uses Arbitrum Sepolia for account orchestration.

The RPC nodes supplied by default in the .env.sample file are free nodes. The repository has been tested using these nodes. You may want to switch to paid nodes to improve your experience.

If you wish to broadcast on a network that is not supported in the list, please contact the Salt team on [Discord](https://discord.gg/UhDUBW9ymM).
