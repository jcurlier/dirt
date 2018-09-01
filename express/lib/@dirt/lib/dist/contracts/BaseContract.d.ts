import { IContract, IContractConfiguration } from './IContract';
import { Dirt, DirtTrace } from '../services/Dirt';
import * as Web3 from 'web3';
export declare class ContractDispatchError extends Error {
    constructor(functionName: string, contract: string, inner: string, tx: Web3.Transaction[]);
}
export declare class MissingContractFunctionError extends Error {
    constructor(functionName: string, contract: string, instance: any);
}
export declare abstract class BaseContract implements IContract {
    context: Dirt;
    protected config: IContractConfiguration;
    protected trace: DirtTrace;
    address: string;
    instance: any;
    name: string;
    private errorAddresses;
    private errorSources;
    constructor(context: Dirt, config: IContractConfiguration);
    init(): Promise<void>;
    protected dispatchTransaction(func: string, ...args: any[]): Promise<any>;
    protected dispatchCall(func: string, ...args: any[]): Promise<any>;
    private getFunc(func, throwIfMissing?);
    private wrapExecution(funcName, promise);
    private addErrorSourceAddress(address);
    private buildError(name, ex);
}
