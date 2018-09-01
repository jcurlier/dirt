"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BigNumber = require("bignumber.js");
var BaseContract_1 = require("./BaseContract");
var DECIMALS = new BigNumber(10).pow(18);
var TokenValue = /** @class */ (function () {
    function TokenValue(_bigNumber, _decimals) {
        this._bigNumber = _bigNumber;
        this._decimals = _decimals;
    }
    Object.defineProperty(TokenValue.prototype, "value", {
        get: function () {
            return this._bigNumber.div(this._decimals).toNumber();
        },
        set: function (value) {
            this._bigNumber = this._decimals.times(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenValue.prototype, "raw", {
        get: function () {
            return this._bigNumber;
        },
        set: function (value) {
            this._bigNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    TokenValue.prototype.toString = function (radix) {
        return this.value.toString(radix);
    };
    TokenValue.prototype.add = function (value) {
        var token = (value instanceof TokenValue) ? value : TokenValue.from(value);
        return TokenValue.fromRaw(this.raw.add(token.raw));
    };
    TokenValue.prototype.sub = function (value) {
        var token = (value instanceof TokenValue) ? value : TokenValue.from(value);
        return TokenValue.fromRaw(this.raw.sub(token.raw));
    };
    TokenValue.prototype.equals = function (value) {
        var raw_value = (value instanceof TokenValue) ? value : TokenValue.from(value);
        return this.raw.eq(raw_value);
    };
    TokenValue.from = function (value) {
        return new TokenValue(DECIMALS.times(value), DECIMALS);
    };
    TokenValue.fromRaw = function (value) {
        return new TokenValue(value, DECIMALS);
    };
    return TokenValue;
}());
exports.TokenValue = TokenValue;
var TokenSpenderApprovalScope = /** @class */ (function () {
    function TokenSpenderApprovalScope(reversion) {
        this.reversion = reversion;
        this.reverting = false;
    }
    TokenSpenderApprovalScope.prototype.revert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.reversion && !this.reverting)) return [3 /*break*/, 4];
                        this.reverting = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reversion()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.reverting = false;
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TokenSpenderApprovalScope.Empty = new TokenSpenderApprovalScope();
    return TokenSpenderApprovalScope;
}());
exports.TokenSpenderApprovalScope = TokenSpenderApprovalScope;
var Token = /** @class */ (function (_super) {
    tslib_1.__extends(Token, _super);
    function Token() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Token.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0: 
                    // Load static metadata
                    return [4 /*yield*/, _super.prototype.init.call(this)];
                    case 1:
                        // Load static metadata
                        _g.sent();
                        _a = this;
                        return [4 /*yield*/, this.instance.name.call()];
                    case 2:
                        _a.name = _g.sent();
                        _b = this;
                        return [4 /*yield*/, this.instance.symbol.call()];
                    case 3:
                        _b.symbol = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this.instance.decimals.call()];
                    case 4:
                        _c.decimals = (_g.sent()).toNumber();
                        _d = this;
                        _f = (_e = TokenValue).fromRaw;
                        return [4 /*yield*/, this.instance.totalSupply.call()];
                    case 5:
                        _d.totalSupply = _f.apply(_e, [_g.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.transfer = function (toAddress, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.trace.message("Transfer " + amount.value + " to " + toAddress);
                        return [4 /*yield*/, this.instance.transfer(toAddress, amount.raw, { from: this.context.defaultAccount() })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.balanceOf = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        account = account || this.context.defaultAccount();
                        return [4 /*yield*/, this.instance.balanceOf.call(account, { from: this.context.defaultAccount() })];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, TokenValue.fromRaw(raw)];
                }
            });
        });
    };
    Token.prototype.approveFor = function (spender, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.trace.message("Approve " + value.value + " for " + spender);
                        return [4 /*yield*/, this.instance.approve(spender, value.raw, { from: this.context.defaultAccount() })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.allowance = function (owner, spender) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.allowance.call(owner, spender)];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, TokenValue.fromRaw(raw)];
                }
            });
        });
    };
    Token.prototype.increaseApproval = function (spender, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentAllowance, increased;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.allowance(this.context.defaultAccount(), spender)];
                    case 1:
                        currentAllowance = _a.sent();
                        increased = currentAllowance.add(value);
                        this.trace.message("Increasing approval from " + currentAllowance.value + " to " + increased.value + " for " + spender);
                        return [4 /*yield*/, this.instance.approve(spender, increased.raw, { from: this.context.defaultAccount() })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.decreaseApproval = function (spender, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentAllowance, decreased;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.allowance(this.context.defaultAccount(), spender)];
                    case 1:
                        currentAllowance = _a.sent();
                        decreased = currentAllowance.sub(value);
                        this.trace.message("Decreasing approval from " + currentAllowance.value + " to " + decreased.value + " for " + spender);
                        return [4 /*yield*/, this.instance.approve(spender, decreased.raw, { from: this.context.defaultAccount() })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Token.prototype.ensureSpenderApproval = function (spender, required) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var current, additional;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.allowance(this.context.defaultAccount(), spender)];
                    case 1:
                        current = _a.sent();
                        if (current.raw.gt(required.raw)) {
                            // We have enough
                            return [2 /*return*/, TokenSpenderApprovalScope.Empty];
                        }
                        additional = required.sub(current);
                        return [4 /*yield*/, this.increaseApproval(spender, additional)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new TokenSpenderApprovalScope(function () { return _this.decreaseApproval(spender, additional); })];
                }
            });
        });
    };
    return Token;
}(BaseContract_1.BaseContract));
exports.Token = Token;
//# sourceMappingURL=Token.js.map