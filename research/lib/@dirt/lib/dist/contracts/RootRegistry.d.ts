import { Registry } from './Registry';
import { IAsyncEnumerableSource } from '../util/AsyncEnumerator';
export declare class RegistryDescriptor {
    name: string;
    address: string;
    vote_style: string;
    timestamp: number;
    constructor(name: string, address: string, vote_style: string, timestamp: number);
}
export interface IKnownAddresses {
    parameters: string;
    self: string;
}
export declare enum VoteStyle {
    Unknown = "",
    Public = "PUBLIC",
    Blind = "BLIND",
}
export declare class RootRegistry extends Registry<RegistryDescriptor> implements IAsyncEnumerableSource<RegistryDescriptor> {
    addresses: IKnownAddresses;
    init(): Promise<void>;
    item(name: string): Promise<RegistryDescriptor>;
    itemAtIndex(index: number): Promise<RegistryDescriptor>;
    create(name: string, style: VoteStyle | string): Promise<RegistryDescriptor>;
    private unpack(values);
}
