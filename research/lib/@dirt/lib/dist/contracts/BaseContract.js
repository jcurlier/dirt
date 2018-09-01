"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function formatDispatch(functionName, contract, inner, tx) {
    var message = "Dispatching function '" + functionName + "' on contract '" + contract + "'";
    if (inner) {
        message += "\nInner Error: " + inner.toString();
    }
    if (tx && tx.length > 0) {
        message += "\nTransactions: ";
        try {
            for (var tx_1 = tslib_1.__values(tx), tx_1_1 = tx_1.next(); !tx_1_1.done; tx_1_1 = tx_1.next()) {
                var t = tx_1_1.value;
                message += "\n   " + t.hash + ": " + t.from + " -> " + t.to;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tx_1_1 && !tx_1_1.done && (_a = tx_1.return)) _a.call(tx_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return message;
    var e_1, _a;
}
var ContractDispatchError = /** @class */ (function (_super) {
    tslib_1.__extends(ContractDispatchError, _super);
    function ContractDispatchError(functionName, contract, inner, tx) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, formatDispatch(functionName, contract, inner, tx)) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return ContractDispatchError;
}(Error));
exports.ContractDispatchError = ContractDispatchError;
var MissingContractFunctionError = /** @class */ (function (_super) {
    tslib_1.__extends(MissingContractFunctionError, _super);
    function MissingContractFunctionError(functionName, contract, instance) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, "Missing dispatch function '" + functionName + "' on contract '" + contract + "'") || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        console.dir(instance);
        return _this;
    }
    return MissingContractFunctionError;
}(Error));
exports.MissingContractFunctionError = MissingContractFunctionError;
var BaseContract = /** @class */ (function () {
    function BaseContract(context, config) {
        this.context = context;
        this.config = config;
        this.errorAddresses = new Set();
        this.errorSources = new Set();
        this.instance = config.instance;
        this.trace = context.trace.create(this.instance.address);
    }
    BaseContract.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.address = this.instance.address;
                this.name = this.instance.address;
                this.errorSources.add(this.address);
                this.errorAddresses.add(this.address);
                return [2 /*return*/];
            });
        });
    };
    BaseContract.prototype.dispatchTransaction = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var f;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        f = this.getFunc(func);
                        return [4 /*yield*/, this.wrapExecution(func, function () { return f.apply(_this.instance, args); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseContract.prototype.dispatchCall = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var f;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        f = this.getFunc(func);
                        if (!f.call) {
                            throw new MissingContractFunctionError(func + ".call", this.name, this.instance);
                        }
                        return [4 /*yield*/, this.wrapExecution(func, function () { return f.apply(_this.instance, args); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseContract.prototype.getFunc = function (func, throwIfMissing) {
        if (throwIfMissing === void 0) { throwIfMissing = true; }
        if (!this.instance[func] && throwIfMissing) {
            throw new MissingContractFunctionError(func, this.name, this.instance);
        }
        return this.instance[func];
    };
    BaseContract.prototype.wrapExecution = function (funcName, promise) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, promise()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        return [4 /*yield*/, this.buildError(funcName, e_2)];
                    case 3: throw (_a.sent());
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaseContract.prototype.addErrorSourceAddress = function (address) {
        this.errorAddresses.add(address);
    };
    BaseContract.prototype.buildError = function (name, ex) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var block;
            return tslib_1.__generator(this, function (_a) {
                block = this.context.web3.eth.getBlock(this.context.web3.eth.blockNumber, true);
                return [2 /*return*/, new ContractDispatchError(name, this.name, ex.message, block.transactions)];
            });
        });
    };
    return BaseContract;
}());
exports.BaseContract = BaseContract;
//# sourceMappingURL=BaseContract.js.map