import * as BigNumber from "bignumber.js";
import { BaseContract } from './BaseContract';
export declare class TokenValue {
    private _bigNumber;
    private _decimals;
    constructor(_bigNumber: BigNumber, _decimals: BigNumber);
    value: number;
    raw: BigNumber;
    toString(radix?: number): string;
    add(value: number | TokenValue): TokenValue;
    sub(value: number | TokenValue): TokenValue;
    equals(value: number | TokenValue): boolean;
    static from(value: number): TokenValue;
    static fromRaw(value: BigNumber): TokenValue;
}
export declare class TokenSpenderApprovalScope {
    private reversion;
    private reverting;
    constructor(reversion?: () => Promise<void>);
    revert(): Promise<void>;
    static Empty: TokenSpenderApprovalScope;
}
export declare class Token extends BaseContract {
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: TokenValue;
    init(): Promise<void>;
    transfer(toAddress: string, amount: TokenValue): Promise<void>;
    balanceOf(account?: string): Promise<TokenValue>;
    approveFor(spender: string, value: TokenValue): Promise<void>;
    allowance(owner: string, spender: string): Promise<TokenValue>;
    increaseApproval(spender: string, value: TokenValue): Promise<void>;
    decreaseApproval(spender: string, value: TokenValue): Promise<void>;
    ensureSpenderApproval(spender: string, required: TokenValue): Promise<TokenSpenderApprovalScope>;
}
