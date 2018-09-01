import * as Web3 from 'web3';
import { IWeb3ContextConfiguration, IContractProvider, IWeb3Context } from './Web3Context';
import { Token, Registry, RegistryType, RootRegistry, IContractConfiguration, IContract, Parameters } from '../contracts';
export interface IDirtConfiguration {
    rootAddress?: string;
    rootContractName?: string;
    trace?: boolean;
    web3: IWeb3ContextConfiguration;
    contractProvider?: IContractProvider;
}
export declare class DirtTrace {
    enabled: boolean;
    private parent;
    private scope;
    constructor(enabled: boolean, parent: Dirt, scope: string);
    message(message: string): DirtTrace;
    object(object: any): DirtTrace;
    error(error: any): DirtTrace;
    promise(promise: () => Promise<any>): Promise<DirtTrace>;
    function(func: Function): DirtTrace;
    private prefix();
    create(scope: string): DirtTrace;
}
export declare class Dirt implements IWeb3Context {
    private configuration;
    Parameters: Parameters;
    Token: Token;
    Root: RootRegistry;
    web3: Web3;
    trace: DirtTrace;
    private context;
    constructor(configuration: IDirtConfiguration);
    getRegistryAtAddress<T extends Registry<any>>(address: string, type: RegistryType): Promise<T>;
    getContract<T extends IContract>(config: IContractConfiguration): Promise<T>;
    defaultAccount(): string;
    private load();
    static create(configuration: IDirtConfiguration): Promise<Dirt>;
}
