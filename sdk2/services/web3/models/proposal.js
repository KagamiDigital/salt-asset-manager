export var ProposalType;
(function (ProposalType) {
    ProposalType[ProposalType["ADD_USER"] = 0] = "ADD_USER";
    ProposalType[ProposalType["REMOVE_USER"] = 1] = "REMOVE_USER";
    ProposalType[ProposalType["ROTATION_THRESHOLD_UPDATE"] = 2] = "ROTATION_THRESHOLD_UPDATE";
    ProposalType[ProposalType["TRANSACTION_THRESHOLD_UPDATE"] = 3] = "TRANSACTION_THRESHOLD_UPDATE";
    ProposalType[ProposalType["ADMIN_THRESHOLD_UPDATE"] = 4] = "ADMIN_THRESHOLD_UPDATE";
    ProposalType[ProposalType["VAULT_NAME_UPDATE"] = 5] = "VAULT_NAME_UPDATE";
})(ProposalType || (ProposalType = {}));
export var VoteState;
(function (VoteState) {
    VoteState[VoteState["NO_VOTE"] = 0] = "NO_VOTE";
    VoteState[VoteState["VOTE_FOR"] = 1] = "VOTE_FOR";
    VoteState[VoteState["VOTE_AGAINST"] = 2] = "VOTE_AGAINST";
})(VoteState || (VoteState = {}));
//# sourceMappingURL=proposal.js.map