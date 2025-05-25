export interface Transaction {
    id: number;
    transactionData: string;
    signedTransactionsNeeded: number;
    userSignedTransactions: UserTransaction[];
    transactionNotes: string;
}
export interface UserTransaction {
    user: string;
    signedTransaction: string;
}
