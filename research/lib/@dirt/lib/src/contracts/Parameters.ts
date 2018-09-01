import { BaseContract } from './BaseContract';

export enum KnownCoreParameters {
    TOKEN = "TOKEN",
    ROOT = "ROOT",
}

export enum KnownClasses {
    CORE = "CORE",
    REGISTRY = "REGISTRY",
    VOTE = "VOTE"
}

export class Parameters extends BaseContract {

    getAddress(class_name: KnownClasses | string, key: string): Promise<string> {
        return this.instance.getAddress.call(class_name, key);
    }

    async setAddress(class_name: KnownClasses | string, key: string, address: string): Promise<void> {
        await this.instance.setAddress(class_name, key, address);
    }
}