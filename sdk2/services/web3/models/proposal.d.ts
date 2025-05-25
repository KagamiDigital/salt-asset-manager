export interface Proposal {
    id: number;
    voteForNeeded: number;
    voteFor: number;
    endTime: number;
    executed: boolean;
    type: ProposalType;
    data: string;
    users: ProposalUser[];
}
export interface ProposalUser {
    address: string;
    voteStatus: VoteState;
}
export declare enum ProposalType {
    ADD_USER = 0,
    REMOVE_USER = 1,
    ROTATION_THRESHOLD_UPDATE = 2,
    TRANSACTION_THRESHOLD_UPDATE = 3,
    ADMIN_THRESHOLD_UPDATE = 4,
    VAULT_NAME_UPDATE = 5
}
export declare enum VoteState {
    NO_VOTE = 0,
    VOTE_FOR = 1,
    VOTE_AGAINST = 2
}
