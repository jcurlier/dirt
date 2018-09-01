import { BaseContract } from './BaseContract';
import { AsyncEnumerator, IAsyncEnumerableSource } from '../util/AsyncEnumerator';

export class RegistryItem {
    constructor(
        public origin: string,
        public key: string,
        public owner: string,
        public value: string,
        public blockHistory: number[],
        public timestamp: number
    ) {

    }
}

export abstract class Registry<T> extends BaseContract implements IAsyncEnumerableSource<T> {

    has(key: string): Promise<boolean> {
        return this.instance.hasItem.call(key);
    }

    async count(): Promise<number> {
        let raw = await this.instance.getItemCount.call();
        return raw.toNumber();
    }

    abstract item(key: string): Promise<T>;

    abstract itemAtIndex(index: number): Promise<T>;

    getEnumerator(): AsyncEnumerator<T> {
        return new AsyncEnumerator<T>(this);
    }
}