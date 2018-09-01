import { Registry, RegistryItem } from './Registry';
import { Token, TokenValue, TokenSpenderApprovalScope } from './Token';

export class StakableRegistryItem extends RegistryItem {
    constructor(origin, key, owner, blockHistory, value, timestamp, public stake: TokenValue) {
        super(origin, key, owner, blockHistory, value, timestamp)
    }
}

export abstract class BaseStakableRegistry<TItem extends StakableRegistryItem = StakableRegistryItem> extends Registry<TItem> {
    public minimumStake: TokenValue;

    async init(): Promise<void> {
        await super.init();

        this.minimumStake = TokenValue.fromRaw(await this.instance.minStakeValue.call());
    }

    async depositBalanceOf(address?: string): Promise<TokenValue> {
        address = address || this.context.defaultAccount();
        let raw = await this.instance.depositBalanceOf.call(address);
        return TokenValue.fromRaw(raw);
    }

    async item(key: string): Promise<TItem> {
        let raw = await this.instance.getItemWithStake.call(key);
        return await this.unpack([key, ...raw]);
    }

    async itemAtIndex(index: number): Promise<TItem> {
        let raw = await this.instance.getAtIndexWithStake.call(index);
        return await this.unpack(raw);
    }

    async addItem(key: string, value: string, stake: TokenValue, approve_transfer: boolean = true): Promise<TItem> {
        stake = stake || TokenValue.from(0);
        let scope: TokenSpenderApprovalScope = TokenSpenderApprovalScope.Empty;

        if (approve_transfer) {
            scope = await this.context.Token.ensureSpenderApproval(this.address, stake);
        }

        try {
            await this.instance.addItem(key, value, stake.raw, { from: this.context.defaultAccount(), gas: 5000000, gasLimit: 6721975 });
        }
        catch (e) {
            await scope.revert();
            throw e;
        }

        return this.item(key);
    }

    async editItem(key: string, value: string): Promise<TItem> {
        await this.instance.editItem(key, value, { from: this.context.defaultAccount() });
        return await this.item(key);
    }

    async deleteItem(key: string): Promise<boolean> {
        return await this.instance.deleteItem(key, { from: this.context.defaultAccount() });
    }

    protected abstract async unpack(value: any[]): Promise<TItem>;
}

export class StakableRegistry extends BaseStakableRegistry {

    protected unpack(value: any[]): Promise<StakableRegistryItem> {
        let unpacked = new StakableRegistryItem(
            this.address,
            value[0],
            value[1],
            value[2],
            value[3].map(i => i.toNumber()),
            value[4].toNumber(),
            TokenValue.fromRaw(value[5])
        );

        return Promise.resolve(unpacked);
    }
}