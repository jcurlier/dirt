"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DefaultAbi = require("@dirt/contracts");
var contract = require("truffle-contract");
var StaticContractProvider = /** @class */ (function () {
    function StaticContractProvider() {
    }
    StaticContractProvider.prototype.get = function (web3Provider, name, address) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var abi, abiWrapper;
            return tslib_1.__generator(this, function (_a) {
                abi = DefaultAbi.contracts[name];
                if (!abi) {
                    throw new Error("Missing ABI export for " + name);
                }
                abiWrapper = contract(abi);
                abiWrapper.setProvider(web3Provider);
                return [2 /*return*/, address ? abiWrapper.at(address) : abiWrapper.deployed()];
            });
        });
    };
    return StaticContractProvider;
}());
exports.StaticContractProvider = StaticContractProvider;
//# sourceMappingURL=StaticContractProvider.js.map