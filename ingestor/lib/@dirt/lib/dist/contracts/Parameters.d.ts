import { BaseContract } from './BaseContract';
export declare enum KnownCoreParameters {
    TOKEN = "TOKEN",
    ROOT = "ROOT",
}
export declare enum KnownClasses {
    CORE = "CORE",
    REGISTRY = "REGISTRY",
    VOTE = "VOTE",
}
export declare class Parameters extends BaseContract {
    getAddress(class_name: KnownClasses | string, key: string): Promise<string>;
    setAddress(class_name: KnownClasses | string, key: string, address: string): Promise<void>;
}
