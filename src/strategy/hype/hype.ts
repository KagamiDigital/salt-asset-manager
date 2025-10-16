import { BigNumber, ContractTransaction, ethers, Contract } from "ethers";
import { askForInput } from "../../helpers";
import { broadcasting_network_provider, signer } from "../../constants";
import ERC20ContractABI from "../../../contracts/ERC20/abi/ERC20.json";
import { Salt, TransferType } from "salt-sdk";
