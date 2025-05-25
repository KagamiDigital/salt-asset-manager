import { Transaction as Tx } from '../services/web3/models/transaction.js';
export interface Transaction extends Tx {
    chainId: string;
    data: string;
    gas: string;
    gasPrice: string;
    nonce: string;
    to: string;
    value: string;
}
export interface TransactionStart extends Tx {
    signedTransactionsNeeded: number;
}
