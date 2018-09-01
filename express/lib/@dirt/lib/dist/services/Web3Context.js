"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Web3 = require("web3");
var StaticContractProvider_1 = require("./StaticContractProvider");
var Web3Context = /** @class */ (function () {
    function Web3Context(config, contractProvider) {
        this.config = config;
        this.contractProvider = contractProvider;
        this.web3 = null;
        this.contractCache = new Map();
        this.instanceCache = new Map();
        if (config.instance) {
            this.web3 = config.instance;
        }
        else if (config.provider) {
            this.web3 = new Web3(config.provider);
        }
        else if (config.endpoint) {
            this.web3 = new Web3(new Web3.providers.HttpProvider(config.endpoint));
        }
        this.contractProvider = contractProvider || new StaticContractProvider_1.StaticContractProvider();
    }
    Web3Context.prototype.getContract = function (config, site) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var key, _a, _b, instance;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        key = config.name + (config.address || 'DEFAULT');
                        if (this.instanceCache.has(key)) {
                            return [2 /*return*/, this.instanceCache.get(key)];
                        }
                        _a = config;
                        _b = config.instance;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getContractInstance(config.name, config.address)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a.instance = _b;
                        instance = new config.type(site || this, config);
                        if (!instance.init) return [3 /*break*/, 4];
                        return [4 /*yield*/, instance.init()];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        this.instanceCache.set(key, instance);
                        return [2 /*return*/, instance];
                }
            });
        });
    };
    Web3Context.prototype.getContractInstance = function (name, address) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var key, instance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = name + (address || 'DEFAULT');
                        if (this.contractCache.has(key)) {
                            return [2 /*return*/, this.contractCache.get(key)];
                        }
                        return [4 /*yield*/, this.contractProvider.get(this.web3.currentProvider, name, address)];
                    case 1:
                        instance = _a.sent();
                        this.contractCache.set(key, instance);
                        return [2 /*return*/, instance];
                }
            });
        });
    };
    Web3Context.prototype.defaultAccount = function () {
        var account = this.config.account || this.web3.eth.defaultAccount || this.web3.eth.accounts[0];
        return account;
    };
    return Web3Context;
}());
exports.Web3Context = Web3Context;
//# sourceMappingURL=Web3Context.js.map