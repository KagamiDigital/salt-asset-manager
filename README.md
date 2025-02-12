# salt-asset-manager

## Introduction

The asset manager bot is meant to be a starter pack for Salt asset managers. By setting up that repository, one can propose transactions to SALT accounts they are authorized signers on. The transaction proposal will be picked up by SALT's backend that will initiate the signing flow. 

## Pre-requisites

### Technical Pre-requisites
Node.js is a required dependency to be able to install and run the the Asset Manager bot. Please make sure to have it installed on your machine (https://nodejs.org/en/download/package-manager).

### Business pre-requisites
A completely set up organisation on staging.salt.space with a funded account. 

## Setting up the Asset Manager Bot

1. clone the repository to your local machine
2. npm install
3. rename .env.sample to .env and set the private key variable to the private key of the account you want to manage assets from (you must be a signer on this account).
4. set BROADCASTING_NETWORK_RPC_NODE_URL, and BROADCASTING_NETWORK_ID to the broadcasting network of your choice in the list below. 


## Quickstart the Asset Manager Bot
1. npm start
2. follow the instructions printed on the command line

### Notes
This repository is meant to serve as a starter pack, we encourage you to update the code, improve it, and propose changes as you see fit.

### SUPPORTED NETWORKS
As of now Salt supports the following networks to broadcast transactions:
- Ethereum Sepolia
- Base Sepolia
- Moonbase Alpha
- Polygon Amoy

### Important Considerations
The orchestration network cannot be changed, as of now SALT uses Arbitrum Sepolia for account orchestration.

The RPC nodes supplied by default in the .env.sample file are free nodes, the repository has been tested using these nodes, however you are free to switch them to paid nodes improve your experience. 

If you wish to broadcast on a network that is not supported in the list, please contact our dev team.



