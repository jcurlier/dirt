"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Registry_1 = require("./Registry");
var Token_1 = require("./Token");
var StakableRegistryItem = /** @class */ (function (_super) {
    tslib_1.__extends(StakableRegistryItem, _super);
    function StakableRegistryItem(origin, key, owner, blockHistory, value, timestamp, stake) {
        var _this = _super.call(this, origin, key, owner, blockHistory, value, timestamp) || this;
        _this.stake = stake;
        return _this;
    }
    return StakableRegistryItem;
}(Registry_1.RegistryItem));
exports.StakableRegistryItem = StakableRegistryItem;
var BaseStakableRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(BaseStakableRegistry, _super);
    function BaseStakableRegistry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseStakableRegistry.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, _super.prototype.init.call(this)];
                    case 1:
                        _d.sent();
                        _a = this;
                        _c = (_b = Token_1.TokenValue).fromRaw;
                        return [4 /*yield*/, this.instance.minStakeValue.call()];
                    case 2:
                        _a.minimumStake = _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseStakableRegistry.prototype.depositBalanceOf = function (address) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = address || this.context.defaultAccount();
                        return [4 /*yield*/, this.instance.depositBalanceOf.call(address)];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, Token_1.TokenValue.fromRaw(raw)];
                }
            });
        });
    };
    BaseStakableRegistry.prototype.item = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.getItemWithStake.call(key)];
                    case 1:
                        raw = _a.sent();
                        return [4 /*yield*/, this.unpack(tslib_1.__spread([key], raw))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseStakableRegistry.prototype.itemAtIndex = function (index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.getAtIndexWithStake.call(index)];
                    case 1:
                        raw = _a.sent();
                        return [4 /*yield*/, this.unpack(raw)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseStakableRegistry.prototype.addItem = function (key, value, stake, approve_transfer) {
        if (approve_transfer === void 0) { approve_transfer = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scope, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stake = stake || Token_1.TokenValue.from(0);
                        scope = Token_1.TokenSpenderApprovalScope.Empty;
                        if (!approve_transfer) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.context.Token.ensureSpenderApproval(this.address, stake)];
                    case 1:
                        scope = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.instance.addItem(key, value, stake.raw, { from: this.context.defaultAccount(), gas: 5000000, gasLimit: 6721975 })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        e_1 = _a.sent();
                        return [4 /*yield*/, scope.revert()];
                    case 5:
                        _a.sent();
                        throw e_1;
                    case 6: return [2 /*return*/, this.item(key)];
                }
            });
        });
    };
    BaseStakableRegistry.prototype.editItem = function (key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.editItem(key, value, { from: this.context.defaultAccount() })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.item(key)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseStakableRegistry.prototype.deleteItem = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.deleteItem(key, { from: this.context.defaultAccount() })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return BaseStakableRegistry;
}(Registry_1.Registry));
exports.BaseStakableRegistry = BaseStakableRegistry;
var StakableRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(StakableRegistry, _super);
    function StakableRegistry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StakableRegistry.prototype.unpack = function (value) {
        var unpacked = new StakableRegistryItem(this.address, value[0], value[1], value[2], value[3].map(function (i) { return i.toNumber(); }), value[4].toNumber(), Token_1.TokenValue.fromRaw(value[5]));
        return Promise.resolve(unpacked);
    };
    return StakableRegistry;
}(BaseStakableRegistry));
exports.StakableRegistry = StakableRegistry;
//# sourceMappingURL=StakableRegistry.js.map