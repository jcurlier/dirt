import * as Web3 from 'web3';
import { IContract, IContractConfiguration } from '../contracts/IContract';
export interface IWeb3ContextConfiguration {
    instance?: Web3;
    provider?: Web3.Provider;
    endpoint?: string;
    account?: string;
}
export interface IContractProvider {
    get(provider: Web3.Provider, name: string, address?: string): Promise<any>;
}
export interface IWeb3Context {
    web3: Web3;
    getContract<T extends IContract>(config: IContractConfiguration): Promise<T>;
    defaultAccount(): string;
}
export declare class Web3Context implements IWeb3Context {
    private config;
    private contractProvider;
    web3: Web3;
    private contractCache;
    private instanceCache;
    constructor(config: IWeb3ContextConfiguration, contractProvider?: IContractProvider);
    getContract<T extends IContract>(config: IContractConfiguration, site?: any): Promise<T>;
    getContractInstance<T>(name: string, address?: string): Promise<T>;
    defaultAccount(): string;
}
