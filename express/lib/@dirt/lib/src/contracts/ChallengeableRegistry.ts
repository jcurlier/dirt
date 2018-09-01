import { StakableRegistryItem, BaseStakableRegistry } from './StakableRegistry';
import { TokenValue, TokenSpenderApprovalScope } from './Token';
import { ScopedPublicVote, PublicVote } from './PublicVote';


export class ChallengeableRegistryItem extends StakableRegistryItem {

    public voteId?: number;
    public voteContract?: string;

}

export class ChallengeableRegistry extends BaseStakableRegistry<ChallengeableRegistryItem> {

    public voteStyle: string = "";

    async init(): Promise<void> {
        await super.init();

        this.voteStyle = await this.instance.voteStyle.call();
    }

    protected async unpack(value: any[]): Promise<ChallengeableRegistryItem> {
        let unpacked = new ChallengeableRegistryItem(
            this.address,
            value[0],
            value[1],
            value[2],
            value[3].map(i => i.toNumber()),
            value[4].toNumber(),
            TokenValue.fromRaw(value[5])
        );

        [unpacked.voteContract, unpacked.voteId] = await this.instance.getActiveVote.call(unpacked.key);

        return unpacked;
    }

    public async challenge(key: string, newValue: string, stake: TokenValue, approve_transfer: boolean = true): Promise<{ voteId: number, contract: string }> {

        stake = stake || TokenValue.from(0);
        let scope: TokenSpenderApprovalScope = TokenSpenderApprovalScope.Empty;

        if (approve_transfer) {
            scope = await this.context.Token.ensureSpenderApproval(this.address, stake);
        }

        this.trace.message(`Challenge ${key} @ ${this.address} with "${newValue}" for ${stake.value}`)

        try {
            await this.instance.challengeItem(key, newValue, stake.raw, { from: this.context.defaultAccount() });
        }
        catch (e) {
            await scope.revert();
            throw e;
        }

        let [contract, id] = await this.instance.getActiveVote.call(key);

        return { voteId: id, contract: contract };
    }

    public async getVoteInstance(key: string): Promise<ScopedPublicVote> {
        let [contract, id] = await this.instance.getActiveVote.call(key);

        if (!contract || !id) {
            throw new Error("Item is not being challenged");
        }

        let publicVote = await this.context.getContract<PublicVote>({ type: PublicVote, address: contract, name: "PublicVoteController" });
        return await publicVote.getScoped(id);
    }

}