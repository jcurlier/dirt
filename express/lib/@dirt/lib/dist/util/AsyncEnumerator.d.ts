export interface IAsyncEnumerableSource<T> {
    count(): Promise<number>;
    itemAtIndex(index: number): Promise<T>;
}
export interface IAsyncBatchEnumerableSource<T> extends IAsyncEnumerableSource<T> {
    itemsAtIndex: (index: number, count: number) => Promise<T[]>;
}
export interface IAsyncEnumerator<T> {
    count: number;
    current: T;
    next(): Promise<boolean>;
    reset(): void;
}
export declare class BatchAsyncEnumerator<T> implements IAsyncEnumerator<T> {
    private source;
    private batchSize;
    count: number;
    current: T;
    private cache;
    private index;
    private cacheIndex;
    constructor(source: IAsyncBatchEnumerableSource<T>, batchSize?: number);
    next(): Promise<boolean>;
    reset(): void;
    private popCache();
}
export declare class AsyncEnumerator<T> implements IAsyncEnumerator<T> {
    private source;
    count: number;
    current: T;
    private index;
    constructor(source: IAsyncEnumerableSource<T>);
    next(): Promise<boolean>;
    reset(): void;
}
