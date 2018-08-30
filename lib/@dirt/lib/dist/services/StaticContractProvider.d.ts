import { IContractProvider } from './Web3Context';
import * as Web3 from 'web3';
export declare class StaticContractProvider implements IContractProvider {
    get(web3Provider: Web3.Provider, name: string, address?: string): Promise<any>;
}
