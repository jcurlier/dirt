"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StakableRegistry_1 = require("./StakableRegistry");
var Token_1 = require("./Token");
var PublicVote_1 = require("./PublicVote");
var ChallengeableRegistryItem = /** @class */ (function (_super) {
    tslib_1.__extends(ChallengeableRegistryItem, _super);
    function ChallengeableRegistryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChallengeableRegistryItem;
}(StakableRegistry_1.StakableRegistryItem));
exports.ChallengeableRegistryItem = ChallengeableRegistryItem;
var ChallengeableRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(ChallengeableRegistry, _super);
    function ChallengeableRegistry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.voteStyle = "";
        return _this;
    }
    ChallengeableRegistry.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.init.call(this)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.instance.voteStyle.call()];
                    case 2:
                        _a.voteStyle = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChallengeableRegistry.prototype.unpack = function (value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var unpacked, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        unpacked = new ChallengeableRegistryItem(this.address, value[0], value[1], value[2], value[3].map(function (i) { return i.toNumber(); }), value[4].toNumber(), Token_1.TokenValue.fromRaw(value[5]));
                        return [4 /*yield*/, this.instance.getActiveVote.call(unpacked.key)];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), unpacked.voteContract = _a[0], unpacked.voteId = _a[1];
                        return [2 /*return*/, unpacked];
                }
            });
        });
    };
    ChallengeableRegistry.prototype.challenge = function (key, newValue, stake, approve_transfer) {
        if (approve_transfer === void 0) { approve_transfer = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scope, e_1, _a, contract, id;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stake = stake || Token_1.TokenValue.from(0);
                        scope = Token_1.TokenSpenderApprovalScope.Empty;
                        if (!approve_transfer) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.context.Token.ensureSpenderApproval(this.address, stake)];
                    case 1:
                        scope = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.trace.message("Challenge " + key + " @ " + this.address + " with \"" + newValue + "\" for " + stake.value);
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.instance.challengeItem(key, newValue, stake.raw, { from: this.context.defaultAccount() })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        e_1 = _b.sent();
                        return [4 /*yield*/, scope.revert()];
                    case 6:
                        _b.sent();
                        throw e_1;
                    case 7: return [4 /*yield*/, this.instance.getActiveVote.call(key)];
                    case 8:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), contract = _a[0], id = _a[1];
                        return [2 /*return*/, { voteId: id, contract: contract }];
                }
            });
        });
    };
    ChallengeableRegistry.prototype.getVoteInstance = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, contract, id, publicVote;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.instance.getActiveVote.call(key)];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), contract = _a[0], id = _a[1];
                        if (!contract || !id) {
                            throw new Error("Item is not being challenged");
                        }
                        return [4 /*yield*/, this.context.getContract({ type: PublicVote_1.PublicVote, address: contract, name: "PublicVoteController" })];
                    case 2:
                        publicVote = _b.sent();
                        return [4 /*yield*/, publicVote.getScoped(id)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return ChallengeableRegistry;
}(StakableRegistry_1.BaseStakableRegistry));
exports.ChallengeableRegistry = ChallengeableRegistry;
//# sourceMappingURL=ChallengeableRegistry.js.map