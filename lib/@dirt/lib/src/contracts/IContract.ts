import { IWeb3Context } from "../services/Web3Context";
import { Dirt } from '../services/Dirt';

export interface IContractConstructable {
    new(dirt: Dirt, config: IContractConfiguration): any;
}

export interface IContract {
    init(): Promise<void>;
}

export interface IContractConfiguration {
    name?: string,
    address?: string,
    type?: IContractConstructable,
    instance?: any,
    singleton?: boolean;
}