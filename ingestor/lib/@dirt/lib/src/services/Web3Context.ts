import * as Web3 from 'web3';

import { IContractConstructable, IContract, IContractConfiguration } from '../contracts/IContract';
import { StaticContractProvider } from './StaticContractProvider';
import { Dirt } from './Dirt';

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

export class Web3Context implements IWeb3Context {

    public web3: Web3 = null;
    private contractCache: Map<string, any> = new Map();
    private instanceCache: Map<string, any> = new Map();

    constructor(private config: IWeb3ContextConfiguration, private contractProvider?: IContractProvider) {
        if (config.instance) {
            this.web3 = config.instance;
        }
        else if (config.provider) {
            this.web3 = new Web3(config.provider);
        }
        else if (config.endpoint) {
            this.web3 = new Web3(new Web3.providers.HttpProvider(config.endpoint));
        }

        this.contractProvider = contractProvider || new StaticContractProvider();
    }

    async getContract<T extends IContract>(config: IContractConfiguration, site?: any): Promise<T> {

        let key = config.name + (config.address || 'DEFAULT');

        if (this.instanceCache.has(key)) {
            return this.instanceCache.get(key);
        }

        config.instance = config.instance || await this.getContractInstance(config.name, config.address);
        let instance = new config.type(site || this, config) as T;

        if (instance.init) {
            await instance.init();
        }

        this.instanceCache.set(key, instance);

        return instance;
    }

    async getContractInstance<T>(name: string, address?: string): Promise<T> {
        let key = name + (address || 'DEFAULT');

        if (this.contractCache.has(key)) {
            return this.contractCache.get(key) as T;
        }

        let instance: any = await this.contractProvider.get(this.web3.currentProvider, name, address);

        this.contractCache.set(key, instance);

        return instance as T;
    }

    defaultAccount(): string {
        let account = this.config.account || this.web3.eth.defaultAccount || this.web3.eth.accounts[0];
        return account;
    }
}