import { BaseContract } from './BaseContract';
import { Registry } from './Registry';
import { IAsyncEnumerableSource } from '../util/AsyncEnumerator';

export class RegistryDescriptor {
    constructor(public name: string, public address: string, public vote_style: string, public timestamp: number) {
    }
}

export interface IKnownAddresses {
    parameters: string;
    self: string;
}

export enum VoteStyle {
    Unknown = "",
    Public = "PUBLIC",
    Blind = "BLIND"
}

export class RootRegistry extends Registry<RegistryDescriptor> implements IAsyncEnumerableSource<RegistryDescriptor> {

    public addresses: IKnownAddresses = null;

    async init(): Promise<void> {
        await super.init();

        this.addresses = {
            self: this.address,
            parameters: await this.dispatchCall('parametersAddress'),
        };
    }

    async item(name: string): Promise<RegistryDescriptor> {
        let raw = await this.instance.getItem(name);
        return this.unpack([name, ...raw]);
    }

    async itemAtIndex(index: number): Promise<RegistryDescriptor> {
        let raw = await this.instance.getAtIndex(index);
        return this.unpack(raw);
    }

    async create(name: string, style: VoteStyle | string): Promise<RegistryDescriptor> {
        if (!name || name.length == 0) {
            throw new Error("Name must be defined");
        }
        else if (!style || style.length == 0) {
            throw new Error("Vote style must be defined");
        }

        // TODO: This sucks, needs to be tuned
        this.trace.message(`Creating registry ${name} with vote style ${style}`);
        await this.instance.create(name, style, { from: this.context.defaultAccount(), gas: 5000000, gasLimit: 6721975 });
        return await this.item(name);
    }

    private unpack(values: any[]) {
        return new RegistryDescriptor(values[0], values[1], values[2], values[3]);
    }
}