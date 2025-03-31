import { ethers } from "ethers";
import ERC20Abi from "../../../contracts/ERC20/abi/ERC20.json";
import rawAbi from "../../../contracts/Spark/abi/sdaiAbi.json";
import { ContractInterface } from "ethers";
const sDaiAbi = rawAbi as ContractInterface;

const DAI_ADDRESS = "0xfcc087f051575f5bf600d53e4e0a6272cfe971b3";  // Replace with DAI address. Right now a test.  
const SDAI_ADDRESS = "0xeca45b0391e81c311f1b390808a3ba3214d35eaa";  //TEST ADDRESS found here: https://sepolia.etherscan.io/token/0xeca45b0391e81c311f1b390808a3ba3214d35eaa?a=0x002d906cD73526dC7dfF06976bF21aA87BB6D0DC. Replace with Sepolia sDAI address
const SPARK_CONTRACT = "0xbbdee277c1fbe6012fc400200485ec86f692a6a7"; // MOCK Contract Replace with Spark's contract

const depositDAIToSpark = async ({ signer }) => {
    const address = await signer.getAddress();
    console.log(`DAI → sDAI Strategy for address: ${address}`);
    const dai = new ethers.Contract(DAI_ADDRESS, ERC20Abi, signer);
    const daiBalance = await dai.balanceOf(address);

    console.log(`DAI Balance: ${ethers.utils.formatUnits(daiBalance, 18)}`);

    const tx = await dai.populateTransaction.approve(SPARK_CONTRACT, daiBalance);
    const sdai = new ethers.Contract(SPARK_CONTRACT, sDaiAbi, signer);

    const depositTx = await sdai.populateTransaction.deposit(
        DAI_ADDRESS,           
        daiBalance,            
        address,               
        0                      
    );
    return [
        {
            to: tx.to!,
            data: tx.data!,
            value: "0"
        },
        {
            to: depositTx.to!,
            data: depositTx.data!,
            value: "0"
        }
    ];
};

export default depositDAIToSpark;