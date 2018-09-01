import { Registry, RegistryItem } from './Registry';
import { TokenValue } from './Token';
export declare class StakableRegistryItem extends RegistryItem {
    stake: TokenValue;
    constructor(origin: any, key: any, owner: any, blockHistory: any, value: any, timestamp: any, stake: TokenValue);
}
export declare abstract class BaseStakableRegistry<TItem extends StakableRegistryItem = StakableRegistryItem> extends Registry<TItem> {
    minimumStake: TokenValue;
    init(): Promise<void>;
    depositBalanceOf(address?: string): Promise<TokenValue>;
    item(key: string): Promise<TItem>;
    itemAtIndex(index: number): Promise<TItem>;
    addItem(key: string, value: string, stake: TokenValue, approve_transfer?: boolean): Promise<TItem>;
    editItem(key: string, value: string): Promise<TItem>;
    deleteItem(key: string): Promise<boolean>;
    protected abstract unpack(value: any[]): Promise<TItem>;
}
export declare class StakableRegistry extends BaseStakableRegistry {
    protected unpack(value: any[]): Promise<StakableRegistryItem>;
}
