import { StakableRegistry } from './StakableRegistry';
import { SimpleRegistry } from './SimpleRegistry';
import { ChallengeableRegistry } from "./ChallengeableRegistry";
export declare type RegistryType = "StakableRegistry" | "SimpleRegistry" | "ChallengeableRegistry";
export declare const RegistryTypes: {
    "StakableRegistry": typeof StakableRegistry;
    "SimpleRegistry": typeof SimpleRegistry;
    "ChallengeableRegistry": typeof ChallengeableRegistry;
};
