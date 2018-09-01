"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Web3Context_1 = require("./Web3Context");
var contracts_1 = require("../contracts");
var DirtTrace = /** @class */ (function () {
    function DirtTrace(enabled, parent, scope) {
        this.enabled = enabled;
        this.parent = parent;
        this.scope = scope;
        this.enabled = enabled;
    }
    DirtTrace.prototype.message = function (message) {
        if (!this.enabled) {
            return this;
        }
        console.log(this.prefix() + (message == null ? '<null>' : message) + 'hello 1');
        return this;
    };
    DirtTrace.prototype.object = function (object) {
        if (!this.enabled) {
            return this;
        }
        if (typeof object == 'string') {
            this.message(object);
        }
        console.log(this.prefix() + 'hello 2');
        console.dir(object == null ? '<null>' : object);
        return this;
    };
    DirtTrace.prototype.error = function (error) {
        if (!this.enabled) {
            return this;
        }
        console.error(this.prefix());
        console.error(error == null ? '<null error>' : error);
        return this;
    };
    DirtTrace.prototype.promise = function (promise) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.enabled) {
                            return [2 /*return*/, this];
                        }
                        res = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, promise()];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.error(e_1);
                        return [2 /*return*/, this];
                    case 4:
                        this.object(res);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    DirtTrace.prototype.function = function (func) {
        if (!this.enabled) {
            return this;
        }
        var res = func();
        this.object(res);
        return this;
    };
    DirtTrace.prototype.prefix = function () {
        var date = new Date();
        var dateString = date.toLocaleTimeString();
        return "[" + dateString + "] " + this.scope + " [From=" + this.parent.defaultAccount() + "] ";
    };
    DirtTrace.prototype.create = function (scope) {
        return new DirtTrace(this.enabled, this.parent, scope);
    };
    return DirtTrace;
}());
exports.DirtTrace = DirtTrace;
var Dirt = /** @class */ (function () {
    function Dirt(configuration) {
        this.configuration = configuration;
        this.context = new Web3Context_1.Web3Context(configuration.web3, configuration.contractProvider);
        this.web3 = this.context.web3;
        this.trace = new DirtTrace(configuration.trace || false, this, "DIRT");
    }
    Dirt.prototype.getRegistryAtAddress = function (address, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getContract({
                        address: address,
                        name: type,
                        type: contracts_1.RegistryTypes[type]
                    })];
            });
        });
    };
    Dirt.prototype.getContract = function (config) {
        return this.context.getContract(config, this);
    };
    Dirt.prototype.defaultAccount = function () {
        return this.context.defaultAccount();
    };
    Dirt.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        // Load the root repository, from this we can discover the rest of the 
                        // static contracts we need
                        _a = this;
                        return [4 /*yield*/, this.getContract({
                                address: this.configuration.rootAddress,
                                type: contracts_1.RootRegistry,
                                name: this.configuration.rootContractName || "RootRegistry"
                            })];
                    case 1:
                        // Load the root repository, from this we can discover the rest of the 
                        // static contracts we need
                        _a.Root = _f.sent();
                        // Load parameters contract to discover everything else 
                        _b = this;
                        return [4 /*yield*/, this.getContract({
                                address: this.Root.addresses.parameters,
                                type: contracts_1.Parameters,
                                name: "Parameters"
                            })];
                    case 2:
                        // Load parameters contract to discover everything else 
                        _b.Parameters = _f.sent();
                        // Load the token singleton 
                        _c = this;
                        _d = this.getContract;
                        _e = {};
                        return [4 /*yield*/, this.Parameters.getAddress(contracts_1.KnownClasses.CORE, contracts_1.KnownCoreParameters.TOKEN)];
                    case 3: return [4 /*yield*/, _d.apply(this, [(_e.address = _f.sent(),
                                _e.type = contracts_1.Token,
                                _e.name = "ProtocolToken",
                                _e)])];
                    case 4:
                        // Load the token singleton 
                        _c.Token = _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Dirt.create = function (configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dirt;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dirt = new Dirt(configuration);
                        return [4 /*yield*/, dirt.load()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, dirt];
                }
            });
        });
    };
    return Dirt;
}());
exports.Dirt = Dirt;
//# sourceMappingURL=Dirt.js.map