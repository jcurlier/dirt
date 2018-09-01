import { StakableRegistryItem, BaseStakableRegistry } from './StakableRegistry';
import { TokenValue } from './Token';
import { ScopedPublicVote } from './PublicVote';
export declare class ChallengeableRegistryItem extends StakableRegistryItem {
    voteId?: number;
    voteContract?: string;
}
export declare class ChallengeableRegistry extends BaseStakableRegistry<ChallengeableRegistryItem> {
    voteStyle: string;
    init(): Promise<void>;
    protected unpack(value: any[]): Promise<ChallengeableRegistryItem>;
    challenge(key: string, newValue: string, stake: TokenValue, approve_transfer?: boolean): Promise<{
        voteId: number;
        contract: string;
    }>;
    getVoteInstance(key: string): Promise<ScopedPublicVote>;
}
