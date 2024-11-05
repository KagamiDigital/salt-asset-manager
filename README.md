# kagami-asset-manager

## Introduction

The asset manager bot is meant to be a starter pack for Salt asset managers. By setting up that repository, one can propose transactions to SALT accounts they are authorized signers on. The transaction proposal will be picked up by SALT's backend that will initiate the signing flow. 

## Pre-requisites

Node.js is a required dependency to be able to install and run the the Asset Manager bot. Please make sure to have it installed on your machine (https://nodejs.org/en/download/package-manager).

## Setting up the Asset Manager Bot

1. clone the repository to your local machine
2. npm install
3. rename .env.sample to .env and set the private key variable to the private key of the account you want to manage assets from.
4. (optional) change the broadcasting network 


## Using the asset Manager Bot
1. npm start
2. follow the instructions printed on the command line

### Notes
This repository is meant to serve as a starter pack, we encourage you to update the code, improve it, and propose changes as you see fit.

### Important Considerations
The orchestration network cannot be change, as of now SALT uses Arbitrum Sepolia for account orchestration.
As of now Salt supports the following networks to broadcast transactions:
- Ethereum Sepolia
- Base Sepolia
- Moonbase Alpha
- Polygon Amoy

The RPC nodes supplied by default in the .env.sample file are free nodes, the repository has been tested using these nodes, however you are free to switch them to improve your experience. 



