import { BaseContract } from "./BaseContract";
import { TokenValue, TokenSpenderApprovalScope } from '.';

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

export enum Candidate {
    None = 0,
    Incumbent = 1,
    Challenger = 2
}

export class PublicVote extends BaseContract {

    async voteExists(voteId: number): Promise<boolean> {
        return await this.instance.voteExists.call(voteId)
    }

    async voteActive(voteId: number): Promise<boolean> {
        return await this.instance.voteActive.call(voteId)
    }

    async getVoteConfiguration(voteId: number): Promise<IVoteConfiguration> {
        let res = await this.instance.getConfig.call(voteId);

        return {
            challengePenalty: res[0].toNumber(),
            votePenalty: res[1].toNumber(),
            challengeLength: res[2].toNumber(),
            challengeDistribution: res[3].toNumber(),
            minVoteStake: TokenValue.fromRaw(res[4]),
            minVoteIncrementalStake: TokenValue.fromRaw(res[4])
        };
    }

    async depositBalanceOf(address?: string): Promise<TokenValue> {
        address = address || this.context.defaultAccount();
        let raw = await this.instance.depositBalanceOf.call(address);
        return TokenValue.fromRaw(raw);
    }

    async getStatus(voteId: number): Promise<IPublicVoteStatus> {
        let [expires, iOwner, cOwner, iValue, cValue, iTotal, cTotal] = await this.instance.getStatus.call(voteId);

        return {
            expirationTimestamp: expires.toNumber(),
            incumbent: {
                owner: iOwner,
                value: iValue,
                totalVoteValue: TokenValue.fromRaw(iTotal),
            },
            challenger: {
                owner: cOwner,
                value: cValue,
                totalVoteValue: TokenValue.fromRaw(cTotal),
            }
        }
    }

    async vote(voteId: number, candidate: Candidate, stake: TokenValue, approve_transfer: boolean = true): Promise<void> {
        let scope: TokenSpenderApprovalScope = TokenSpenderApprovalScope.Empty;

        if (approve_transfer) {
            scope = await this.context.Token.ensureSpenderApproval(this.address, stake);
        }

        this.trace.message(`Vote candidate '${candidate}' on vote '${voteId}' with stake of ${stake}`);

        try {
            await this.instance.vote(voteId, candidate, stake.raw, { from: this.context.defaultAccount() });
        }
        catch (e) {
            await scope.revert();
            throw e;
        }
    }

    async increaseVote(voteId: number, additionalStake: TokenValue, approve_transfer: boolean = true): Promise<void> {
        let scope: TokenSpenderApprovalScope = TokenSpenderApprovalScope.Empty;

        if (approve_transfer) {
            scope = await this.context.Token.ensureSpenderApproval(this.address, additionalStake);
        }

        this.trace.message(`Increase existing vote for vote ${voteId} by stake of ${additionalStake}`);

        try {
            await this.instance.increaseVote(voteId, additionalStake.raw, { from: this.context.defaultAccount() });
        }
        catch (e) {
            await scope.revert();
            throw e;
        }
    }

    async process(voteId: number): Promise<boolean> {
        await this.instance.process(voteId);
        let res = await this.instance.process.call(voteId, { from: this.context.defaultAccount() });
        this.trace.message(`Called process for vote ${voteId}. Result = ${res}`);
        return res;
    }

    async distributeVoteResult(voteId: number): Promise<void> {
        return this.dispatchTransaction('distributeVoteResult', voteId, { from: this.context.defaultAccount() });
    }

    async getScoped(voteId: number): Promise<ScopedPublicVote> {
        let instance = new ScopedPublicVote(this, voteId);
        instance.configuration = await this.getVoteConfiguration(voteId);
        return instance;
    }
}

export class ScopedPublicVote {

    public address: string;
    public configuration: IVoteConfiguration;

    constructor(private source: PublicVote, public id: number) {
        this.address = source.address;
    }

    depositBalanceOf(address?: string): Promise<TokenValue> {
        return this.source.depositBalanceOf(address);
    }

    exists(): Promise<boolean> {
        return this.source.voteExists(this.id);
    }

    active(): Promise<boolean> {
        return this.source.voteActive(this.id);
    }

    getStatus(): Promise<IPublicVoteStatus> {
        return this.source.getStatus(this.id);
    }

    vote(candidate: Candidate, stake: TokenValue, auto_approve: boolean = true): Promise<void> {
        return this.source.vote(this.id, candidate, stake, auto_approve);
    }

    increaseVote(additionalStake: TokenValue, auto_approve: boolean = true): Promise<void> {
        return this.source.increaseVote(this.id, additionalStake, auto_approve);
    }

    process(): Promise<boolean> {
        return this.source.process(this.id);
    }

    distributeVoteResult(): Promise<void> {
        return this.source.distributeVoteResult(this.id);
    }
}