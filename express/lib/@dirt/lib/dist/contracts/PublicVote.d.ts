import { BaseContract } from "./BaseContract";
import { TokenValue } from '.';
export interface ICandidate {
    owner: string;
    value: string;
    totalVoteValue: TokenValue;
}
export interface IPublicVoteStatus {
    expirationTimestamp: number;
    incumbent: ICandidate;
    challenger: ICandidate;
}
export interface IVoteConfiguration {
    challengePenalty: number;
    votePenalty: number;
    challengeLength: number;
    challengeDistribution: number;
    minVoteStake: TokenValue;
    minVoteIncrementalStake: TokenValue;
}
export declare enum Candidate {
    None = 0,
    Incumbent = 1,
    Challenger = 2,
}
export declare class PublicVote extends BaseContract {
    voteExists(voteId: number): Promise<boolean>;
    voteActive(voteId: number): Promise<boolean>;
    getVoteConfiguration(voteId: number): Promise<IVoteConfiguration>;
    depositBalanceOf(address?: string): Promise<TokenValue>;
    getStatus(voteId: number): Promise<IPublicVoteStatus>;
    vote(voteId: number, candidate: Candidate, stake: TokenValue, approve_transfer?: boolean): Promise<void>;
    increaseVote(voteId: number, additionalStake: TokenValue, approve_transfer?: boolean): Promise<void>;
    process(voteId: number): Promise<boolean>;
    distributeVoteResult(voteId: number): Promise<void>;
    getScoped(voteId: number): Promise<ScopedPublicVote>;
}
export declare class ScopedPublicVote {
    private source;
    id: number;
    address: string;
    configuration: IVoteConfiguration;
    constructor(source: PublicVote, id: number);
    depositBalanceOf(address?: string): Promise<TokenValue>;
    exists(): Promise<boolean>;
    active(): Promise<boolean>;
    getStatus(): Promise<IPublicVoteStatus>;
    vote(candidate: Candidate, stake: TokenValue, auto_approve?: boolean): Promise<void>;
    increaseVote(additionalStake: TokenValue, auto_approve?: boolean): Promise<void>;
    process(): Promise<boolean>;
    distributeVoteResult(): Promise<void>;
}
