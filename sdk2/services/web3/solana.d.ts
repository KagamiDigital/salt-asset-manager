import { Signer } from "ethers";
import { Keypair, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
export declare function submitSolanaMessage(recipient: string, amountInLamports: number | string, vaultAddress: string, signer: Signer, notes?: string, returnHash?: boolean): Promise<string | import("ethers").ContractTransaction | undefined>;
export declare function signSolanaMessage(vaultAddress: string, txId: number, signer: Signer, intuSignature?: string, experimental?: boolean, returnHash?: boolean): Promise<string | import("ethers").ContractTransaction | undefined>;
export declare function sendSolanaTransaction(pdaInfo: {
    pdaPublicKey: PublicKey;
    program: Program;
    provider: AnchorProvider;
}, recipient: string, amount: number, signature: string, vaultEthAddress: string, networkUrl?: string): Promise<{
    signature: string;
    confirmed: boolean;
    message: string;
} | undefined>;
interface SolanaWallet {
    keypair: Keypair;
    walletAddress: string;
}
export declare const generateSolanaWallet: (uniqueness: string) => SolanaWallet;
export declare const createPda: (solanaWallet: SolanaWallet, masterPublicKey?: string, networkUrl?: string) => Promise<{
    pdaPublicKey: PublicKey;
    program: Program<import("@coral-xyz/anchor").Idl>;
    provider: AnchorProvider;
    seeds: {
        seed1: string;
        seed2: string;
    };
} | undefined>;
export declare const sendFromPda: (pdaInfo: {
    pdaPublicKey: PublicKey;
    program: Program;
    provider: AnchorProvider;
}, amount: number, recipient: string, eoa: string, message: string, signature: string) => Promise<{
    success: boolean;
    message: string;
    amount: number;
    recipient: string;
}>;
export declare const formatWalletAddress: (address: string) => string;
export declare function combineSignedSolanaMessage(vaultAddress: string, txId: number, signer: Signer): Promise<string | undefined>;
export {};
