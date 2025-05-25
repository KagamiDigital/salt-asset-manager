import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils, providers } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common.js";
export declare namespace VaultGovernance {
    type ProposalStruct = {
        id: PromiseOrValue<BigNumberish>;
        voteForNeeded: PromiseOrValue<BigNumberish>;
        voteForCount: PromiseOrValue<BigNumberish>;
        executed: PromiseOrValue<boolean>;
        cancelled: PromiseOrValue<boolean>;
        _calldata: PromiseOrValue<BytesLike>;
        endTime: PromiseOrValue<BigNumberish>;
        feeValue: PromiseOrValue<BigNumberish>;
        creator: PromiseOrValue<string>;
    };
    type ProposalStructOutput = [
        BigNumber,
        number,
        number,
        boolean,
        boolean,
        string,
        BigNumber,
        BigNumber,
        string
    ] & {
        id: BigNumber;
        voteForNeeded: number;
        voteForCount: number;
        executed: boolean;
        cancelled: boolean;
        _calldata: string;
        endTime: BigNumber;
        feeValue: BigNumber;
        creator: string;
    };
}
export declare namespace VaultManager {
    type TransactionStruct = {
        votesNeeded: PromiseOrValue<BigNumberish>;
        votesFor: PromiseOrValue<BigNumberish>;
        id: PromiseOrValue<BigNumberish>;
    };
    type TransactionStructOutput = [number, number, BigNumber] & {
        votesNeeded: number;
        votesFor: number;
        id: BigNumber;
    };
    type VaultStruct = {
        registeredUsersCount: PromiseOrValue<BigNumberish>;
        rotateThreshold: PromiseOrValue<BigNumberish>;
        transactionThreshold: PromiseOrValue<BigNumberish>;
        adminThreshold: PromiseOrValue<BigNumberish>;
        usersCount: PromiseOrValue<BigNumberish>;
        createdDate: PromiseOrValue<BigNumberish>;
        createdBlock: PromiseOrValue<BigNumberish>;
        transactionCount: PromiseOrValue<BigNumberish>;
        completed: PromiseOrValue<boolean>;
        resharingOccurred: PromiseOrValue<boolean>;
        encryptionMessage: PromiseOrValue<BytesLike>;
        seed: PromiseOrValue<string>;
        name: PromiseOrValue<BytesLike>;
        users: PromiseOrValue<string>[];
        masterPublicKey: PromiseOrValue<string>;
    };
    type VaultStructOutput = [
        number,
        number,
        number,
        number,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        boolean,
        string,
        string,
        string,
        string[],
        string
    ] & {
        registeredUsersCount: number;
        rotateThreshold: number;
        transactionThreshold: number;
        adminThreshold: number;
        usersCount: number;
        createdDate: BigNumber;
        createdBlock: BigNumber;
        transactionCount: BigNumber;
        completed: boolean;
        resharingOccurred: boolean;
        encryptionMessage: string;
        seed: string;
        name: string;
        users: string[];
        masterPublicKey: string;
    };
}
export interface VaultInterface extends utils.Interface {
    functions: {
        "PROPOSAL_IN_PROCESS()": FunctionFragment;
        "PROPOSAL_VOTE_DURATION()": FunctionFragment;
        "VAULT_USER_COUNT_LIMIT()": FunctionFragment;
        "addUserDoneStep1(address,uint256)": FunctionFragment;
        "addUserDoneStep2(address,uint256)": FunctionFragment;
        "addUserDoneStep3(address,uint256)": FunctionFragment;
        "cancelProposal(uint256)": FunctionFragment;
        "cancelUserToAdd()": FunctionFragment;
        "completeVault(address[],address)": FunctionFragment;
        "executeProposal(uint256)": FunctionFragment;
        "factoryAddress()": FunctionFragment;
        "feeContractAddress()": FunctionFragment;
        "getProposalCounter()": FunctionFragment;
        "getUserToAdd()": FunctionFragment;
        "getUserToRemove()": FunctionFragment;
        "hasUserConfirmedTransaction(uint256,address)": FunctionFragment;
        "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)": FunctionFragment;
        "managerAddress()": FunctionFragment;
        "messageCount()": FunctionFragment;
        "messages(uint256)": FunctionFragment;
        "messagesSigned(uint256,address)": FunctionFragment;
        "preRegister(string,string,string,string)": FunctionFragment;
        "proposalInfos(uint256)": FunctionFragment;
        "proposalVoteUserInfos(uint256,address)": FunctionFragment;
        "proposeTransaction(string,string)": FunctionFragment;
        "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)": FunctionFragment;
        "registerAllSteps(string,string,string,string,string,string,string,string,string,string)": FunctionFragment;
        "submitUserToAdd(address[])": FunctionFragment;
        "submitUsersToRotate(address,address)": FunctionFragment;
        "totalAddUserStep1Done(uint256)": FunctionFragment;
        "totalAddUserStep2Done(uint256)": FunctionFragment;
        "totalAddUserStep3Done(uint256)": FunctionFragment;
        "transactionInfos(uint256)": FunctionFragment;
        "transactionVotes(uint256,address)": FunctionFragment;
        "transactions(uint256)": FunctionFragment;
        "updateFeeContractAddress(address)": FunctionFragment;
        "userConfirmTx(uint256,string)": FunctionFragment;
        "userInfos(address)": FunctionFragment;
        "userToAdd(uint256)": FunctionFragment;
        "userToAddCount()": FunctionFragment;
        "userToRemove(uint256)": FunctionFragment;
        "usersMapping(address)": FunctionFragment;
        "vault()": FunctionFragment;
        "vaultInfos()": FunctionFragment;
        "voteAgainst(uint256)": FunctionFragment;
        "voteFor(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "PROPOSAL_IN_PROCESS" | "PROPOSAL_IN_PROCESS()" | "PROPOSAL_VOTE_DURATION" | "PROPOSAL_VOTE_DURATION()" | "VAULT_USER_COUNT_LIMIT" | "VAULT_USER_COUNT_LIMIT()" | "addUserDoneStep1" | "addUserDoneStep1(address,uint256)" | "addUserDoneStep2" | "addUserDoneStep2(address,uint256)" | "addUserDoneStep3" | "addUserDoneStep3(address,uint256)" | "cancelProposal" | "cancelProposal(uint256)" | "cancelUserToAdd" | "cancelUserToAdd()" | "completeVault" | "completeVault(address[],address)" | "executeProposal" | "executeProposal(uint256)" | "factoryAddress" | "factoryAddress()" | "feeContractAddress" | "feeContractAddress()" | "getProposalCounter" | "getProposalCounter()" | "getUserToAdd" | "getUserToAdd()" | "getUserToRemove" | "getUserToRemove()" | "hasUserConfirmedTransaction" | "hasUserConfirmedTransaction(uint256,address)" | "initialize" | "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)" | "managerAddress" | "managerAddress()" | "messageCount" | "messageCount()" | "messages" | "messages(uint256)" | "messagesSigned" | "messagesSigned(uint256,address)" | "preRegister" | "preRegister(string,string,string,string)" | "proposalInfos" | "proposalInfos(uint256)" | "proposalVoteUserInfos" | "proposalVoteUserInfos(uint256,address)" | "proposeTransaction" | "proposeTransaction(string,string)" | "registerAllReshareSteps" | "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)" | "registerAllSteps" | "registerAllSteps(string,string,string,string,string,string,string,string,string,string)" | "submitUserToAdd" | "submitUserToAdd(address[])" | "submitUsersToRotate" | "submitUsersToRotate(address,address)" | "totalAddUserStep1Done" | "totalAddUserStep1Done(uint256)" | "totalAddUserStep2Done" | "totalAddUserStep2Done(uint256)" | "totalAddUserStep3Done" | "totalAddUserStep3Done(uint256)" | "transactionInfos" | "transactionInfos(uint256)" | "transactionVotes" | "transactionVotes(uint256,address)" | "transactions" | "transactions(uint256)" | "updateFeeContractAddress" | "updateFeeContractAddress(address)" | "userConfirmTx" | "userConfirmTx(uint256,string)" | "userInfos" | "userInfos(address)" | "userToAdd" | "userToAdd(uint256)" | "userToAddCount" | "userToAddCount()" | "userToRemove" | "userToRemove(uint256)" | "usersMapping" | "usersMapping(address)" | "vault" | "vault()" | "vaultInfos" | "vaultInfos()" | "voteAgainst" | "voteAgainst(uint256)" | "voteFor" | "voteFor(uint256)"): FunctionFragment;
    encodeFunctionData(functionFragment: "PROPOSAL_IN_PROCESS", values?: undefined): string;
    encodeFunctionData(functionFragment: "PROPOSAL_IN_PROCESS()", values?: undefined): string;
    encodeFunctionData(functionFragment: "PROPOSAL_VOTE_DURATION", values?: undefined): string;
    encodeFunctionData(functionFragment: "PROPOSAL_VOTE_DURATION()", values?: undefined): string;
    encodeFunctionData(functionFragment: "VAULT_USER_COUNT_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "VAULT_USER_COUNT_LIMIT()", values?: undefined): string;
    encodeFunctionData(functionFragment: "addUserDoneStep1", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addUserDoneStep1(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addUserDoneStep2", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addUserDoneStep2(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addUserDoneStep3", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addUserDoneStep3(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "cancelProposal", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "cancelProposal(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "cancelUserToAdd", values?: undefined): string;
    encodeFunctionData(functionFragment: "cancelUserToAdd()", values?: undefined): string;
    encodeFunctionData(functionFragment: "completeVault", values: [PromiseOrValue<string>[], PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "completeVault(address[],address)", values: [PromiseOrValue<string>[], PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "executeProposal", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "executeProposal(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "factoryAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "factoryAddress()", values?: undefined): string;
    encodeFunctionData(functionFragment: "feeContractAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "feeContractAddress()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getProposalCounter", values?: undefined): string;
    encodeFunctionData(functionFragment: "getProposalCounter()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUserToAdd", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUserToAdd()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUserToRemove", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUserToRemove()", values?: undefined): string;
    encodeFunctionData(functionFragment: "hasUserConfirmedTransaction", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "hasUserConfirmedTransaction(uint256,address)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "managerAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "managerAddress()", values?: undefined): string;
    encodeFunctionData(functionFragment: "messageCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "messageCount()", values?: undefined): string;
    encodeFunctionData(functionFragment: "messages", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "messages(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "messagesSigned", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "messagesSigned(uint256,address)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "preRegister", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "preRegister(string,string,string,string)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "proposalInfos", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "proposalInfos(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "proposalVoteUserInfos", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "proposalVoteUserInfos(uint256,address)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "proposeTransaction", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "proposeTransaction(string,string)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "registerAllReshareSteps", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "registerAllSteps", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "registerAllSteps(string,string,string,string,string,string,string,string,string,string)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "submitUserToAdd", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "submitUserToAdd(address[])", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "submitUsersToRotate", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "submitUsersToRotate(address,address)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep1Done", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep1Done(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep2Done", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep2Done(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep3Done", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep3Done(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transactionInfos", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transactionInfos(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transactionVotes", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transactionVotes(uint256,address)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transactions", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transactions(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateFeeContractAddress", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "updateFeeContractAddress(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "userConfirmTx", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "userConfirmTx(uint256,string)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "userInfos", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "userInfos(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "userToAdd", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "userToAdd(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "userToAddCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "userToAddCount()", values?: undefined): string;
    encodeFunctionData(functionFragment: "userToRemove", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "userToRemove(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "usersMapping", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "usersMapping(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "vault", values?: undefined): string;
    encodeFunctionData(functionFragment: "vault()", values?: undefined): string;
    encodeFunctionData(functionFragment: "vaultInfos", values?: undefined): string;
    encodeFunctionData(functionFragment: "vaultInfos()", values?: undefined): string;
    encodeFunctionData(functionFragment: "voteAgainst", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "voteAgainst(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "voteFor", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "voteFor(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "PROPOSAL_IN_PROCESS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PROPOSAL_IN_PROCESS()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PROPOSAL_VOTE_DURATION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PROPOSAL_VOTE_DURATION()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VAULT_USER_COUNT_LIMIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VAULT_USER_COUNT_LIMIT()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep1", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep1(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep2", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep2(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep3", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep3(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelProposal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelProposal(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelUserToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelUserToAdd()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "completeVault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "completeVault(address[],address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeProposal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeProposal(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factoryAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factoryAddress()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feeContractAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feeContractAddress()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProposalCounter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProposalCounter()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUserToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUserToAdd()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUserToRemove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUserToRemove()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasUserConfirmedTransaction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasUserConfirmedTransaction(uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "managerAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "managerAddress()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messageCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messageCount()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messages", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messages(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messagesSigned", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messagesSigned(uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "preRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "preRegister(string,string,string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposalInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposalInfos(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposalVoteUserInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposalVoteUserInfos(uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposeTransaction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposeTransaction(string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAllReshareSteps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAllSteps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAllSteps(string,string,string,string,string,string,string,string,string,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitUserToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitUserToAdd(address[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitUsersToRotate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitUsersToRotate(address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep1Done", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep1Done(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep2Done", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep2Done(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep3Done", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep3Done(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactionInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactionInfos(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactionVotes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactionVotes(uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactions(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateFeeContractAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateFeeContractAddress(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userConfirmTx", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userConfirmTx(uint256,string)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userInfos(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToAdd(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToAddCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToAddCount()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToRemove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToRemove(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "usersMapping", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "usersMapping(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vault()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultInfos()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "voteAgainst", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "voteAgainst(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "voteFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "voteFor(uint256)", data: BytesLike): Result;
    events: {
        "FeeContractAddressUpdated(address,address)": EventFragment;
        "MessageSigned(uint256,address,string)": EventFragment;
        "MessageToSignProposed(uint256,string)": EventFragment;
        "ProposalCreated(uint256,uint8,bytes)": EventFragment;
        "TransactionProposed(uint256,string,string)": EventFragment;
        "TransactionUserConfirmed(uint256,address,string)": EventFragment;
        "VaultAddUserRequested(address[])": EventFragment;
        "VaultAddUserRequestedEventFromCore(address,address[])": EventFragment;
        "VaultCompleted(address[],address)": EventFragment;
        "VaultNewName(string)": EventFragment;
        "VaultRemoveUserRequested(address)": EventFragment;
        "VaultRotateUserRequested(address,address)": EventFragment;
        "VaultUserAdded(address)": EventFragment;
        "VaultUserInitialized(address)": EventFragment;
        "VaultUserPreRegister(address,string,string,string,string)": EventFragment;
        "VaultUserRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)": EventFragment;
        "VaultUserRemoved(address)": EventFragment;
        "VaultUserReshareRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "FeeContractAddressUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FeeContractAddressUpdated(address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MessageSigned"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MessageSigned(uint256,address,string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MessageToSignProposed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MessageToSignProposed(uint256,string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProposalCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProposalCreated(uint256,uint8,bytes)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransactionProposed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransactionProposed(uint256,string,string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransactionUserConfirmed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransactionUserConfirmed(uint256,address,string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultAddUserRequested"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultAddUserRequested(address[])"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultAddUserRequestedEventFromCore"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultAddUserRequestedEventFromCore(address,address[])"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultCompleted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultCompleted(address[],address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultNewName"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultNewName(string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultRemoveUserRequested"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultRemoveUserRequested(address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultRotateUserRequested"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultRotateUserRequested(address,address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserAdded(address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserInitialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserInitialized(address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserPreRegister"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserPreRegister(address,string,string,string,string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserRegisteredAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserRemoved(address)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserReshareRegisteredAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserReshareRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)"): EventFragment;
}
export interface FeeContractAddressUpdatedEventObject {
    oldFeeContractAddress: string;
    newFeeContractAddress: string;
}
export type FeeContractAddressUpdatedEvent = TypedEvent<[
    string,
    string
], FeeContractAddressUpdatedEventObject>;
export type FeeContractAddressUpdatedEventFilter = TypedEventFilter<FeeContractAddressUpdatedEvent>;
export interface MessageSignedEventObject {
    messId: BigNumber;
    signer: string;
    signedMessage: string;
}
export type MessageSignedEvent = TypedEvent<[
    BigNumber,
    string,
    string
], MessageSignedEventObject>;
export type MessageSignedEventFilter = TypedEventFilter<MessageSignedEvent>;
export interface MessageToSignProposedEventObject {
    messId: BigNumber;
    message: string;
}
export type MessageToSignProposedEvent = TypedEvent<[
    BigNumber,
    string
], MessageToSignProposedEventObject>;
export type MessageToSignProposedEventFilter = TypedEventFilter<MessageToSignProposedEvent>;
export interface ProposalCreatedEventObject {
    id: BigNumber;
    _type: number;
    data: string;
}
export type ProposalCreatedEvent = TypedEvent<[
    BigNumber,
    number,
    string
], ProposalCreatedEventObject>;
export type ProposalCreatedEventFilter = TypedEventFilter<ProposalCreatedEvent>;
export interface TransactionProposedEventObject {
    txId: BigNumber;
    transactionInfo: string;
    notes: string;
}
export type TransactionProposedEvent = TypedEvent<[
    BigNumber,
    string,
    string
], TransactionProposedEventObject>;
export type TransactionProposedEventFilter = TypedEventFilter<TransactionProposedEvent>;
export interface TransactionUserConfirmedEventObject {
    txId: BigNumber;
    user: string;
    signedTransaction: string;
}
export type TransactionUserConfirmedEvent = TypedEvent<[
    BigNumber,
    string,
    string
], TransactionUserConfirmedEventObject>;
export type TransactionUserConfirmedEventFilter = TypedEventFilter<TransactionUserConfirmedEvent>;
export interface VaultAddUserRequestedEventObject {
    userToAdd: string[];
}
export type VaultAddUserRequestedEvent = TypedEvent<[
    string[]
], VaultAddUserRequestedEventObject>;
export type VaultAddUserRequestedEventFilter = TypedEventFilter<VaultAddUserRequestedEvent>;
export interface VaultAddUserRequestedEventFromCoreEventObject {
    vaultAddress: string;
    userToAdd: string[];
}
export type VaultAddUserRequestedEventFromCoreEvent = TypedEvent<[
    string,
    string[]
], VaultAddUserRequestedEventFromCoreEventObject>;
export type VaultAddUserRequestedEventFromCoreEventFilter = TypedEventFilter<VaultAddUserRequestedEventFromCoreEvent>;
export interface VaultCompletedEventObject {
    users: string[];
    _masterPubKey: string;
}
export type VaultCompletedEvent = TypedEvent<[
    string[],
    string
], VaultCompletedEventObject>;
export type VaultCompletedEventFilter = TypedEventFilter<VaultCompletedEvent>;
export interface VaultNewNameEventObject {
    name: string;
}
export type VaultNewNameEvent = TypedEvent<[string], VaultNewNameEventObject>;
export type VaultNewNameEventFilter = TypedEventFilter<VaultNewNameEvent>;
export interface VaultRemoveUserRequestedEventObject {
    userToRemove: string;
}
export type VaultRemoveUserRequestedEvent = TypedEvent<[
    string
], VaultRemoveUserRequestedEventObject>;
export type VaultRemoveUserRequestedEventFilter = TypedEventFilter<VaultRemoveUserRequestedEvent>;
export interface VaultRotateUserRequestedEventObject {
    userToAdd: string;
    userToRemove: string;
}
export type VaultRotateUserRequestedEvent = TypedEvent<[
    string,
    string
], VaultRotateUserRequestedEventObject>;
export type VaultRotateUserRequestedEventFilter = TypedEventFilter<VaultRotateUserRequestedEvent>;
export interface VaultUserAddedEventObject {
    userToAdd: string;
}
export type VaultUserAddedEvent = TypedEvent<[
    string
], VaultUserAddedEventObject>;
export type VaultUserAddedEventFilter = TypedEventFilter<VaultUserAddedEvent>;
export interface VaultUserInitializedEventObject {
    user: string;
}
export type VaultUserInitializedEvent = TypedEvent<[
    string
], VaultUserInitializedEventObject>;
export type VaultUserInitializedEventFilter = TypedEventFilter<VaultUserInitializedEvent>;
export interface VaultUserPreRegisterEventObject {
    user: string;
    _parisEncKey: string;
    _megaPublicKey: string;
    _encSharedKey: string;
    _dbKey: string;
}
export type VaultUserPreRegisterEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string
], VaultUserPreRegisterEventObject>;
export type VaultUserPreRegisterEventFilter = TypedEventFilter<VaultUserPreRegisterEvent>;
export interface VaultUserRegisteredAllEventObject {
    user: string;
    _step1Dealings: string;
    _openingKey: string;
    _openingKappa: string;
    _openingLambda: string;
    _simpleDealingKey: string;
    _simpleDealingKappa: string;
    _transcriptKey: string;
    _transcriptKappa: string;
    _transcriptLambda: string;
    _step3Crypto: string;
}
export type VaultUserRegisteredAllEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
], VaultUserRegisteredAllEventObject>;
export type VaultUserRegisteredAllEventFilter = TypedEventFilter<VaultUserRegisteredAllEvent>;
export interface VaultUserRemovedEventObject {
    userToRemove: string;
}
export type VaultUserRemovedEvent = TypedEvent<[
    string
], VaultUserRemovedEventObject>;
export type VaultUserRemovedEventFilter = TypedEventFilter<VaultUserRemovedEvent>;
export interface VaultUserReshareRegisteredAllEventObject {
    user: string;
    _step1Dealings: string;
    _simpleOpeningKeyResharedOnce: string;
    _pedersenOpeningKappaReshare: string;
    _pedersenOpeningLambdaReshare: string;
    _simpleDealingKeyReshareTwice: string;
    _simpleDealingKappaReshare: string;
    _transcriptKeyResharedOnce: string;
    _transcriptKappaReshare: string;
    _transcriptLambdaReshare: string;
    _step3Stuff: string;
}
export type VaultUserReshareRegisteredAllEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
], VaultUserReshareRegisteredAllEventObject>;
export type VaultUserReshareRegisteredAllEventFilter = TypedEventFilter<VaultUserReshareRegisteredAllEvent>;
export interface Vault extends BaseContract {
    connect(signerOrProvider: Signer | providers.Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: VaultInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<providers.Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<[boolean]>;
        "PROPOSAL_IN_PROCESS()"(overrides?: CallOverrides): Promise<[boolean]>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<[BigNumber]>;
        "PROPOSAL_VOTE_DURATION()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<[number]>;
        "VAULT_USER_COUNT_LIMIT()"(overrides?: CallOverrides): Promise<[number]>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        "addUserDoneStep1(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        "addUserDoneStep2(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        "addUserDoneStep3(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "cancelProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        cancelUserToAdd(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "cancelUserToAdd()"(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "completeVault(address[],address)"(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "executeProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        factoryAddress(overrides?: CallOverrides): Promise<[string]>;
        "factoryAddress()"(overrides?: CallOverrides): Promise<[string]>;
        feeContractAddress(overrides?: CallOverrides): Promise<[string]>;
        "feeContractAddress()"(overrides?: CallOverrides): Promise<[string]>;
        getProposalCounter(overrides?: CallOverrides): Promise<[BigNumber]>;
        "getProposalCounter()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        getUserToAdd(overrides?: CallOverrides): Promise<[string[]]>;
        "getUserToAdd()"(overrides?: CallOverrides): Promise<[string[]]>;
        getUserToRemove(overrides?: CallOverrides): Promise<[string[]]>;
        "getUserToRemove()"(overrides?: CallOverrides): Promise<[string[]]>;
        hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "hasUserConfirmedTransaction(uint256,address)"(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)"(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        managerAddress(overrides?: CallOverrides): Promise<[string]>;
        "managerAddress()"(overrides?: CallOverrides): Promise<[string]>;
        messageCount(overrides?: CallOverrides): Promise<[BigNumber]>;
        "messageCount()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        "messages(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "messagesSigned(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "preRegister(string,string,string,string)"(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[VaultGovernance.ProposalStructOutput]>;
        "proposalInfos(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[VaultGovernance.ProposalStructOutput]>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number]>;
        "proposalVoteUserInfos(uint256,address)"(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number]>;
        proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "proposeTransaction(string,string)"(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)"(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "registerAllSteps(string,string,string,string,string,string,string,string,string,string)"(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "submitUserToAdd(address[])"(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "submitUsersToRotate(address,address)"(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "totalAddUserStep1Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "totalAddUserStep2Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "totalAddUserStep3Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[VaultManager.TransactionStructOutput]>;
        "transactionInfos(uint256)"(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[VaultManager.TransactionStructOutput]>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "transactionVotes(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        "transactions(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        updateFeeContractAddress(_newFeeContractAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateFeeContractAddress(address)"(_newFeeContractAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "userConfirmTx(uint256,string)"(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            boolean,
            boolean
        ] & {
            isPartOfVault: boolean;
            isRegistered: boolean;
        }>;
        "userInfos(address)"(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            boolean,
            boolean
        ] & {
            isPartOfVault: boolean;
            isRegistered: boolean;
        }>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        "userToAdd(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        userToAddCount(overrides?: CallOverrides): Promise<[BigNumber]>;
        "userToAddCount()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        "userToRemove(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            string,
            boolean,
            number
        ] & {
            userAddress: string;
            isRegistered: boolean;
            index: number;
        }>;
        "usersMapping(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            string,
            boolean,
            number
        ] & {
            userAddress: string;
            isRegistered: boolean;
            index: number;
        }>;
        vault(overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean,
            boolean,
            string,
            string,
            string,
            string
        ] & {
            registeredUsersCount: number;
            rotateThreshold: number;
            transactionThreshold: number;
            adminThreshold: number;
            usersCount: number;
            createdDate: BigNumber;
            createdBlock: BigNumber;
            transactionCount: BigNumber;
            completed: boolean;
            resharingOccurred: boolean;
            encryptionMessage: string;
            seed: string;
            name: string;
            masterPublicKey: string;
        }>;
        "vault()"(overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean,
            boolean,
            string,
            string,
            string,
            string
        ] & {
            registeredUsersCount: number;
            rotateThreshold: number;
            transactionThreshold: number;
            adminThreshold: number;
            usersCount: number;
            createdDate: BigNumber;
            createdBlock: BigNumber;
            transactionCount: BigNumber;
            completed: boolean;
            resharingOccurred: boolean;
            encryptionMessage: string;
            seed: string;
            name: string;
            masterPublicKey: string;
        }>;
        vaultInfos(overrides?: CallOverrides): Promise<[VaultManager.VaultStructOutput]>;
        "vaultInfos()"(overrides?: CallOverrides): Promise<[VaultManager.VaultStructOutput]>;
        voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "voteAgainst(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "voteFor(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<boolean>;
    "PROPOSAL_IN_PROCESS()"(overrides?: CallOverrides): Promise<boolean>;
    PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
    "PROPOSAL_VOTE_DURATION()"(overrides?: CallOverrides): Promise<BigNumber>;
    VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<number>;
    "VAULT_USER_COUNT_LIMIT()"(overrides?: CallOverrides): Promise<number>;
    addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    "addUserDoneStep1(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    "addUserDoneStep2(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    "addUserDoneStep3(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "cancelProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    cancelUserToAdd(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "cancelUserToAdd()"(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "completeVault(address[],address)"(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "executeProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    factoryAddress(overrides?: CallOverrides): Promise<string>;
    "factoryAddress()"(overrides?: CallOverrides): Promise<string>;
    feeContractAddress(overrides?: CallOverrides): Promise<string>;
    "feeContractAddress()"(overrides?: CallOverrides): Promise<string>;
    getProposalCounter(overrides?: CallOverrides): Promise<BigNumber>;
    "getProposalCounter()"(overrides?: CallOverrides): Promise<BigNumber>;
    getUserToAdd(overrides?: CallOverrides): Promise<string[]>;
    "getUserToAdd()"(overrides?: CallOverrides): Promise<string[]>;
    getUserToRemove(overrides?: CallOverrides): Promise<string[]>;
    "getUserToRemove()"(overrides?: CallOverrides): Promise<string[]>;
    hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "hasUserConfirmedTransaction(uint256,address)"(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)"(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    managerAddress(overrides?: CallOverrides): Promise<string>;
    "managerAddress()"(overrides?: CallOverrides): Promise<string>;
    messageCount(overrides?: CallOverrides): Promise<BigNumber>;
    "messageCount()"(overrides?: CallOverrides): Promise<BigNumber>;
    messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        number,
        BigNumber
    ] & {
        votesNeeded: number;
        votesFor: number;
        id: BigNumber;
    }>;
    "messages(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        number,
        BigNumber
    ] & {
        votesNeeded: number;
        votesFor: number;
        id: BigNumber;
    }>;
    messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "messagesSigned(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "preRegister(string,string,string,string)"(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultGovernance.ProposalStructOutput>;
    "proposalInfos(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultGovernance.ProposalStructOutput>;
    proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
    "proposalVoteUserInfos(uint256,address)"(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
    proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "proposeTransaction(string,string)"(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)"(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "registerAllSteps(string,string,string,string,string,string,string,string,string,string)"(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "submitUserToAdd(address[])"(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "submitUsersToRotate(address,address)"(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "totalAddUserStep1Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "totalAddUserStep2Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "totalAddUserStep3Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultManager.TransactionStructOutput>;
    "transactionInfos(uint256)"(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultManager.TransactionStructOutput>;
    transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "transactionVotes(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        number,
        BigNumber
    ] & {
        votesNeeded: number;
        votesFor: number;
        id: BigNumber;
    }>;
    "transactions(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        number,
        BigNumber
    ] & {
        votesNeeded: number;
        votesFor: number;
        id: BigNumber;
    }>;
    updateFeeContractAddress(_newFeeContractAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateFeeContractAddress(address)"(_newFeeContractAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "userConfirmTx(uint256,string)"(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
        boolean,
        boolean
    ] & {
        isPartOfVault: boolean;
        isRegistered: boolean;
    }>;
    "userInfos(address)"(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
        boolean,
        boolean
    ] & {
        isPartOfVault: boolean;
        isRegistered: boolean;
    }>;
    userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    "userToAdd(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    userToAddCount(overrides?: CallOverrides): Promise<BigNumber>;
    "userToAddCount()"(overrides?: CallOverrides): Promise<BigNumber>;
    userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    "userToRemove(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
        string,
        boolean,
        number
    ] & {
        userAddress: string;
        isRegistered: boolean;
        index: number;
    }>;
    "usersMapping(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
        string,
        boolean,
        number
    ] & {
        userAddress: string;
        isRegistered: boolean;
        index: number;
    }>;
    vault(overrides?: CallOverrides): Promise<[
        number,
        number,
        number,
        number,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        boolean,
        string,
        string,
        string,
        string
    ] & {
        registeredUsersCount: number;
        rotateThreshold: number;
        transactionThreshold: number;
        adminThreshold: number;
        usersCount: number;
        createdDate: BigNumber;
        createdBlock: BigNumber;
        transactionCount: BigNumber;
        completed: boolean;
        resharingOccurred: boolean;
        encryptionMessage: string;
        seed: string;
        name: string;
        masterPublicKey: string;
    }>;
    "vault()"(overrides?: CallOverrides): Promise<[
        number,
        number,
        number,
        number,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        boolean,
        string,
        string,
        string,
        string
    ] & {
        registeredUsersCount: number;
        rotateThreshold: number;
        transactionThreshold: number;
        adminThreshold: number;
        usersCount: number;
        createdDate: BigNumber;
        createdBlock: BigNumber;
        transactionCount: BigNumber;
        completed: boolean;
        resharingOccurred: boolean;
        encryptionMessage: string;
        seed: string;
        name: string;
        masterPublicKey: string;
    }>;
    vaultInfos(overrides?: CallOverrides): Promise<VaultManager.VaultStructOutput>;
    "vaultInfos()"(overrides?: CallOverrides): Promise<VaultManager.VaultStructOutput>;
    voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "voteAgainst(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "voteFor(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<boolean>;
        "PROPOSAL_IN_PROCESS()"(overrides?: CallOverrides): Promise<boolean>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
        "PROPOSAL_VOTE_DURATION()"(overrides?: CallOverrides): Promise<BigNumber>;
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<number>;
        "VAULT_USER_COUNT_LIMIT()"(overrides?: CallOverrides): Promise<number>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "addUserDoneStep1(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "addUserDoneStep2(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        "addUserDoneStep3(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "cancelProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        cancelUserToAdd(overrides?: CallOverrides): Promise<void>;
        "cancelUserToAdd()"(overrides?: CallOverrides): Promise<void>;
        completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "completeVault(address[],address)"(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "executeProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        factoryAddress(overrides?: CallOverrides): Promise<string>;
        "factoryAddress()"(overrides?: CallOverrides): Promise<string>;
        feeContractAddress(overrides?: CallOverrides): Promise<string>;
        "feeContractAddress()"(overrides?: CallOverrides): Promise<string>;
        getProposalCounter(overrides?: CallOverrides): Promise<BigNumber>;
        "getProposalCounter()"(overrides?: CallOverrides): Promise<BigNumber>;
        getUserToAdd(overrides?: CallOverrides): Promise<string[]>;
        "getUserToAdd()"(overrides?: CallOverrides): Promise<string[]>;
        getUserToRemove(overrides?: CallOverrides): Promise<string[]>;
        "getUserToRemove()"(overrides?: CallOverrides): Promise<string[]>;
        hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "hasUserConfirmedTransaction(uint256,address)"(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)"(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        managerAddress(overrides?: CallOverrides): Promise<string>;
        "managerAddress()"(overrides?: CallOverrides): Promise<string>;
        messageCount(overrides?: CallOverrides): Promise<BigNumber>;
        "messageCount()"(overrides?: CallOverrides): Promise<BigNumber>;
        messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        "messages(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "messagesSigned(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "preRegister(string,string,string,string)"(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultGovernance.ProposalStructOutput>;
        "proposalInfos(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultGovernance.ProposalStructOutput>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
        "proposalVoteUserInfos(uint256,address)"(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
        proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "proposeTransaction(string,string)"(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)"(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "registerAllSteps(string,string,string,string,string,string,string,string,string,string)"(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        "submitUserToAdd(address[])"(usersToAdd: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "submitUsersToRotate(address,address)"(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalAddUserStep1Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalAddUserStep2Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalAddUserStep3Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultManager.TransactionStructOutput>;
        "transactionInfos(uint256)"(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultManager.TransactionStructOutput>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "transactionVotes(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        "transactions(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        updateFeeContractAddress(_newFeeContractAddress: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "updateFeeContractAddress(address)"(_newFeeContractAddress: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "userConfirmTx(uint256,string)"(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            boolean,
            boolean
        ] & {
            isPartOfVault: boolean;
            isRegistered: boolean;
        }>;
        "userInfos(address)"(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            boolean,
            boolean
        ] & {
            isPartOfVault: boolean;
            isRegistered: boolean;
        }>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "userToAdd(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        userToAddCount(overrides?: CallOverrides): Promise<BigNumber>;
        "userToAddCount()"(overrides?: CallOverrides): Promise<BigNumber>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "userToRemove(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            string,
            boolean,
            number
        ] & {
            userAddress: string;
            isRegistered: boolean;
            index: number;
        }>;
        "usersMapping(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            string,
            boolean,
            number
        ] & {
            userAddress: string;
            isRegistered: boolean;
            index: number;
        }>;
        vault(overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean,
            boolean,
            string,
            string,
            string,
            string
        ] & {
            registeredUsersCount: number;
            rotateThreshold: number;
            transactionThreshold: number;
            adminThreshold: number;
            usersCount: number;
            createdDate: BigNumber;
            createdBlock: BigNumber;
            transactionCount: BigNumber;
            completed: boolean;
            resharingOccurred: boolean;
            encryptionMessage: string;
            seed: string;
            name: string;
            masterPublicKey: string;
        }>;
        "vault()"(overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean,
            boolean,
            string,
            string,
            string,
            string
        ] & {
            registeredUsersCount: number;
            rotateThreshold: number;
            transactionThreshold: number;
            adminThreshold: number;
            usersCount: number;
            createdDate: BigNumber;
            createdBlock: BigNumber;
            transactionCount: BigNumber;
            completed: boolean;
            resharingOccurred: boolean;
            encryptionMessage: string;
            seed: string;
            name: string;
            masterPublicKey: string;
        }>;
        vaultInfos(overrides?: CallOverrides): Promise<VaultManager.VaultStructOutput>;
        "vaultInfos()"(overrides?: CallOverrides): Promise<VaultManager.VaultStructOutput>;
        voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "voteAgainst(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "voteFor(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "FeeContractAddressUpdated(address,address)"(oldFeeContractAddress?: null, newFeeContractAddress?: null): FeeContractAddressUpdatedEventFilter;
        FeeContractAddressUpdated(oldFeeContractAddress?: null, newFeeContractAddress?: null): FeeContractAddressUpdatedEventFilter;
        "MessageSigned(uint256,address,string)"(messId?: null, signer?: null, signedMessage?: null): MessageSignedEventFilter;
        MessageSigned(messId?: null, signer?: null, signedMessage?: null): MessageSignedEventFilter;
        "MessageToSignProposed(uint256,string)"(messId?: null, message?: null): MessageToSignProposedEventFilter;
        MessageToSignProposed(messId?: null, message?: null): MessageToSignProposedEventFilter;
        "ProposalCreated(uint256,uint8,bytes)"(id?: PromiseOrValue<BigNumberish> | null, _type?: null, data?: null): ProposalCreatedEventFilter;
        ProposalCreated(id?: PromiseOrValue<BigNumberish> | null, _type?: null, data?: null): ProposalCreatedEventFilter;
        "TransactionProposed(uint256,string,string)"(txId?: PromiseOrValue<BigNumberish> | null, transactionInfo?: null, notes?: null): TransactionProposedEventFilter;
        TransactionProposed(txId?: PromiseOrValue<BigNumberish> | null, transactionInfo?: null, notes?: null): TransactionProposedEventFilter;
        "TransactionUserConfirmed(uint256,address,string)"(txId?: PromiseOrValue<BigNumberish> | null, user?: PromiseOrValue<string> | null, signedTransaction?: null): TransactionUserConfirmedEventFilter;
        TransactionUserConfirmed(txId?: PromiseOrValue<BigNumberish> | null, user?: PromiseOrValue<string> | null, signedTransaction?: null): TransactionUserConfirmedEventFilter;
        "VaultAddUserRequested(address[])"(userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFilter;
        VaultAddUserRequested(userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFilter;
        "VaultAddUserRequestedEventFromCore(address,address[])"(vaultAddress?: null, userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFromCoreEventFilter;
        VaultAddUserRequestedEventFromCore(vaultAddress?: null, userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFromCoreEventFilter;
        "VaultCompleted(address[],address)"(users?: null, _masterPubKey?: null): VaultCompletedEventFilter;
        VaultCompleted(users?: null, _masterPubKey?: null): VaultCompletedEventFilter;
        "VaultNewName(string)"(name?: null): VaultNewNameEventFilter;
        VaultNewName(name?: null): VaultNewNameEventFilter;
        "VaultRemoveUserRequested(address)"(userToRemove?: PromiseOrValue<string> | null): VaultRemoveUserRequestedEventFilter;
        VaultRemoveUserRequested(userToRemove?: PromiseOrValue<string> | null): VaultRemoveUserRequestedEventFilter;
        "VaultRotateUserRequested(address,address)"(userToAdd?: PromiseOrValue<string> | null, userToRemove?: PromiseOrValue<string> | null): VaultRotateUserRequestedEventFilter;
        VaultRotateUserRequested(userToAdd?: PromiseOrValue<string> | null, userToRemove?: PromiseOrValue<string> | null): VaultRotateUserRequestedEventFilter;
        "VaultUserAdded(address)"(userToAdd?: null): VaultUserAddedEventFilter;
        VaultUserAdded(userToAdd?: null): VaultUserAddedEventFilter;
        "VaultUserInitialized(address)"(user?: PromiseOrValue<string> | null): VaultUserInitializedEventFilter;
        VaultUserInitialized(user?: PromiseOrValue<string> | null): VaultUserInitializedEventFilter;
        "VaultUserPreRegister(address,string,string,string,string)"(user?: PromiseOrValue<string> | null, _parisEncKey?: null, _megaPublicKey?: null, _encSharedKey?: null, _dbKey?: null): VaultUserPreRegisterEventFilter;
        VaultUserPreRegister(user?: PromiseOrValue<string> | null, _parisEncKey?: null, _megaPublicKey?: null, _encSharedKey?: null, _dbKey?: null): VaultUserPreRegisterEventFilter;
        "VaultUserRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)"(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _openingKey?: null, _openingKappa?: null, _openingLambda?: null, _simpleDealingKey?: null, _simpleDealingKappa?: null, _transcriptKey?: null, _transcriptKappa?: null, _transcriptLambda?: null, _step3Crypto?: null): VaultUserRegisteredAllEventFilter;
        VaultUserRegisteredAll(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _openingKey?: null, _openingKappa?: null, _openingLambda?: null, _simpleDealingKey?: null, _simpleDealingKappa?: null, _transcriptKey?: null, _transcriptKappa?: null, _transcriptLambda?: null, _step3Crypto?: null): VaultUserRegisteredAllEventFilter;
        "VaultUserRemoved(address)"(userToRemove?: null): VaultUserRemovedEventFilter;
        VaultUserRemoved(userToRemove?: null): VaultUserRemovedEventFilter;
        "VaultUserReshareRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)"(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _simpleOpeningKeyResharedOnce?: null, _pedersenOpeningKappaReshare?: null, _pedersenOpeningLambdaReshare?: null, _simpleDealingKeyReshareTwice?: null, _simpleDealingKappaReshare?: null, _transcriptKeyResharedOnce?: null, _transcriptKappaReshare?: null, _transcriptLambdaReshare?: null, _step3Stuff?: null): VaultUserReshareRegisteredAllEventFilter;
        VaultUserReshareRegisteredAll(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _simpleOpeningKeyResharedOnce?: null, _pedersenOpeningKappaReshare?: null, _pedersenOpeningLambdaReshare?: null, _simpleDealingKeyReshareTwice?: null, _simpleDealingKappaReshare?: null, _transcriptKeyResharedOnce?: null, _transcriptKappaReshare?: null, _transcriptLambdaReshare?: null, _step3Stuff?: null): VaultUserReshareRegisteredAllEventFilter;
    };
    estimateGas: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<BigNumber>;
        "PROPOSAL_IN_PROCESS()"(overrides?: CallOverrides): Promise<BigNumber>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
        "PROPOSAL_VOTE_DURATION()"(overrides?: CallOverrides): Promise<BigNumber>;
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        "VAULT_USER_COUNT_LIMIT()"(overrides?: CallOverrides): Promise<BigNumber>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "addUserDoneStep1(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "addUserDoneStep2(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "addUserDoneStep3(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "cancelProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        cancelUserToAdd(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "cancelUserToAdd()"(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "completeVault(address[],address)"(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "executeProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        factoryAddress(overrides?: CallOverrides): Promise<BigNumber>;
        "factoryAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
        feeContractAddress(overrides?: CallOverrides): Promise<BigNumber>;
        "feeContractAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
        getProposalCounter(overrides?: CallOverrides): Promise<BigNumber>;
        "getProposalCounter()"(overrides?: CallOverrides): Promise<BigNumber>;
        getUserToAdd(overrides?: CallOverrides): Promise<BigNumber>;
        "getUserToAdd()"(overrides?: CallOverrides): Promise<BigNumber>;
        getUserToRemove(overrides?: CallOverrides): Promise<BigNumber>;
        "getUserToRemove()"(overrides?: CallOverrides): Promise<BigNumber>;
        hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "hasUserConfirmedTransaction(uint256,address)"(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)"(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        managerAddress(overrides?: CallOverrides): Promise<BigNumber>;
        "managerAddress()"(overrides?: CallOverrides): Promise<BigNumber>;
        messageCount(overrides?: CallOverrides): Promise<BigNumber>;
        "messageCount()"(overrides?: CallOverrides): Promise<BigNumber>;
        messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "messages(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "messagesSigned(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "preRegister(string,string,string,string)"(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "proposalInfos(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "proposalVoteUserInfos(uint256,address)"(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "proposeTransaction(string,string)"(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)"(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "registerAllSteps(string,string,string,string,string,string,string,string,string,string)"(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "submitUserToAdd(address[])"(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "submitUsersToRotate(address,address)"(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalAddUserStep1Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalAddUserStep2Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalAddUserStep3Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "transactionInfos(uint256)"(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "transactionVotes(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "transactions(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        updateFeeContractAddress(_newFeeContractAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateFeeContractAddress(address)"(_newFeeContractAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "userConfirmTx(uint256,string)"(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "userInfos(address)"(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "userToAdd(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        userToAddCount(overrides?: CallOverrides): Promise<BigNumber>;
        "userToAddCount()"(overrides?: CallOverrides): Promise<BigNumber>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "userToRemove(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "usersMapping(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        vault(overrides?: CallOverrides): Promise<BigNumber>;
        "vault()"(overrides?: CallOverrides): Promise<BigNumber>;
        vaultInfos(overrides?: CallOverrides): Promise<BigNumber>;
        "vaultInfos()"(overrides?: CallOverrides): Promise<BigNumber>;
        voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "voteAgainst(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "voteFor(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "PROPOSAL_IN_PROCESS()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "PROPOSAL_VOTE_DURATION()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "VAULT_USER_COUNT_LIMIT()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "addUserDoneStep1(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "addUserDoneStep2(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "addUserDoneStep3(address,uint256)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "cancelProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        cancelUserToAdd(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "cancelUserToAdd()"(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "completeVault(address[],address)"(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "executeProposal(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        factoryAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "factoryAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        feeContractAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "feeContractAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getProposalCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getProposalCounter()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUserToAdd(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getUserToAdd()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUserToRemove(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getUserToRemove()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "hasUserConfirmedTransaction(uint256,address)"(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)"(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        managerAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "managerAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        messageCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "messageCount()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "messages(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "messagesSigned(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "preRegister(string,string,string,string)"(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "proposalInfos(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "proposalVoteUserInfos(uint256,address)"(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "proposeTransaction(string,string)"(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)"(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "registerAllSteps(string,string,string,string,string,string,string,string,string,string)"(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "submitUserToAdd(address[])"(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "submitUsersToRotate(address,address)"(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "totalAddUserStep1Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "totalAddUserStep2Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "totalAddUserStep3Done(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "transactionInfos(uint256)"(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "transactionVotes(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "transactions(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        updateFeeContractAddress(_newFeeContractAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateFeeContractAddress(address)"(_newFeeContractAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "userConfirmTx(uint256,string)"(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "userInfos(address)"(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "userToAdd(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userToAddCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "userToAddCount()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "userToRemove(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "usersMapping(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "vault()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        vaultInfos(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "vaultInfos()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "voteAgainst(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "voteFor(uint256)"(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
