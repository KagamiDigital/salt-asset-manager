import { Vault } from '../services/web3/models/vault.js';
import { Proposal } from '../services/web3/models/proposal.js';
import { Transaction } from './models.js';
export interface VaultAllInfo extends Vault {
    proposals: Proposal[];
    transactions: Transaction[];
}
