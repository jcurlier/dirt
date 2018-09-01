import { BaseContract } from './BaseContract';
import { AsyncEnumerator, IAsyncEnumerableSource } from '../util/AsyncEnumerator';
export declare class RegistryItem {
    origin: string;
    key: string;
    owner: string;
    value: string;
    blockHistory: number[];
    timestamp: number;
    constructor(origin: string, key: string, owner: string, value: string, blockHistory: number[], timestamp: number);
}
export declare abstract class Registry<T> extends BaseContract implements IAsyncEnumerableSource<T> {
    has(key: string): Promise<boolean>;
    count(): Promise<number>;
    abstract item(key: string): Promise<T>;
    abstract itemAtIndex(index: number): Promise<T>;
    getEnumerator(): AsyncEnumerator<T>;
}
