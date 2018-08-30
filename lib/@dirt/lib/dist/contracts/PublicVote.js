"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseContract_1 = require("./BaseContract");
var _1 = require(".");
var Candidate;
(function (Candidate) {
    Candidate[Candidate["None"] = 0] = "None";
    Candidate[Candidate["Incumbent"] = 1] = "Incumbent";
    Candidate[Candidate["Challenger"] = 2] = "Challenger";
})(Candidate = exports.Candidate || (exports.Candidate = {}));
var PublicVote = /** @class */ (function (_super) {
    tslib_1.__extends(PublicVote, _super);
    function PublicVote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PublicVote.prototype.voteExists = function (voteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.voteExists.call(voteId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PublicVote.prototype.voteActive = function (voteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.voteActive.call(voteId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PublicVote.prototype.getVoteConfiguration = function (voteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.getConfig.call(voteId)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, {
                                challengePenalty: res[0].toNumber(),
                                votePenalty: res[1].toNumber(),
                                challengeLength: res[2].toNumber(),
                                challengeDistribution: res[3].toNumber(),
                                minVoteStake: _1.TokenValue.fromRaw(res[4]),
                                minVoteIncrementalStake: _1.TokenValue.fromRaw(res[4])
                            }];
                }
            });
        });
    };
    PublicVote.prototype.depositBalanceOf = function (address) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = address || this.context.defaultAccount();
                        return [4 /*yield*/, this.instance.depositBalanceOf.call(address)];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, _1.TokenValue.fromRaw(raw)];
                }
            });
        });
    };
    PublicVote.prototype.getStatus = function (voteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, expires, iOwner, cOwner, iValue, cValue, iTotal, cTotal;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.instance.getStatus.call(voteId)];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 7]), expires = _a[0], iOwner = _a[1], cOwner = _a[2], iValue = _a[3], cValue = _a[4], iTotal = _a[5], cTotal = _a[6];
                        return [2 /*return*/, {
                                expirationTimestamp: expires.toNumber(),
                                incumbent: {
                                    owner: iOwner,
                                    value: iValue,
                                    totalVoteValue: _1.TokenValue.fromRaw(iTotal),
                                },
                                challenger: {
                                    owner: cOwner,
                                    value: cValue,
                                    totalVoteValue: _1.TokenValue.fromRaw(cTotal),
                                }
                            }];
                }
            });
        });
    };
    PublicVote.prototype.vote = function (voteId, candidate, stake, approve_transfer) {
        if (approve_transfer === void 0) { approve_transfer = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scope, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = _1.TokenSpenderApprovalScope.Empty;
                        if (!approve_transfer) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.context.Token.ensureSpenderApproval(this.address, stake)];
                    case 1:
                        scope = _a.sent();
                        _a.label = 2;
                    case 2:
                        this.trace.message("Vote candidate '" + candidate + "' on vote '" + voteId + "' with stake of " + stake);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.instance.vote(voteId, candidate, stake.raw, { from: this.context.defaultAccount() })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        e_1 = _a.sent();
                        return [4 /*yield*/, scope.revert()];
                    case 6:
                        _a.sent();
                        throw e_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PublicVote.prototype.increaseVote = function (voteId, additionalStake, approve_transfer) {
        if (approve_transfer === void 0) { approve_transfer = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scope, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = _1.TokenSpenderApprovalScope.Empty;
                        if (!approve_transfer) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.context.Token.ensureSpenderApproval(this.address, additionalStake)];
                    case 1:
                        scope = _a.sent();
                        _a.label = 2;
                    case 2:
                        this.trace.message("Increase existing vote for vote " + voteId + " by stake of " + additionalStake);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.instance.increaseVote(voteId, additionalStake.raw, { from: this.context.defaultAccount() })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        e_2 = _a.sent();
                        return [4 /*yield*/, scope.revert()];
                    case 6:
                        _a.sent();
                        throw e_2;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PublicVote.prototype.process = function (voteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.process(voteId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.instance.process.call(voteId, { from: this.context.defaultAccount() })];
                    case 2:
                        res = _a.sent();
                        this.trace.message("Called process for vote " + voteId + ". Result = " + res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    PublicVote.prototype.distributeVoteResult = function (voteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.dispatchTransaction('distributeVoteResult', voteId, { from: this.context.defaultAccount() })];
            });
        });
    };
    PublicVote.prototype.getScoped = function (voteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var instance, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        instance = new ScopedPublicVote(this, voteId);
                        _a = instance;
                        return [4 /*yield*/, this.getVoteConfiguration(voteId)];
                    case 1:
                        _a.configuration = _b.sent();
                        return [2 /*return*/, instance];
                }
            });
        });
    };
    return PublicVote;
}(BaseContract_1.BaseContract));
exports.PublicVote = PublicVote;
var ScopedPublicVote = /** @class */ (function () {
    function ScopedPublicVote(source, id) {
        this.source = source;
        this.id = id;
        this.address = source.address;
    }
    ScopedPublicVote.prototype.depositBalanceOf = function (address) {
        return this.source.depositBalanceOf(address);
    };
    ScopedPublicVote.prototype.exists = function () {
        return this.source.voteExists(this.id);
    };
    ScopedPublicVote.prototype.active = function () {
        return this.source.voteActive(this.id);
    };
    ScopedPublicVote.prototype.getStatus = function () {
        return this.source.getStatus(this.id);
    };
    ScopedPublicVote.prototype.vote = function (candidate, stake, auto_approve) {
        if (auto_approve === void 0) { auto_approve = true; }
        return this.source.vote(this.id, candidate, stake, auto_approve);
    };
    ScopedPublicVote.prototype.increaseVote = function (additionalStake, auto_approve) {
        if (auto_approve === void 0) { auto_approve = true; }
        return this.source.increaseVote(this.id, additionalStake, auto_approve);
    };
    ScopedPublicVote.prototype.process = function () {
        return this.source.process(this.id);
    };
    ScopedPublicVote.prototype.distributeVoteResult = function () {
        return this.source.distributeVoteResult(this.id);
    };
    return ScopedPublicVote;
}());
exports.ScopedPublicVote = ScopedPublicVote;
//# sourceMappingURL=PublicVote.js.map