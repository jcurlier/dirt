"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Registry_1 = require("./Registry");
var RegistryDescriptor = /** @class */ (function () {
    function RegistryDescriptor(name, address, vote_style, timestamp) {
        this.name = name;
        this.address = address;
        this.vote_style = vote_style;
        this.timestamp = timestamp;
    }
    return RegistryDescriptor;
}());
exports.RegistryDescriptor = RegistryDescriptor;
var VoteStyle;
(function (VoteStyle) {
    VoteStyle["Unknown"] = "";
    VoteStyle["Public"] = "PUBLIC";
    VoteStyle["Blind"] = "BLIND";
})(VoteStyle = exports.VoteStyle || (exports.VoteStyle = {}));
var RootRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(RootRegistry, _super);
    function RootRegistry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addresses = null;
        return _this;
    }
    RootRegistry.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.init.call(this)];
                    case 1:
                        _c.sent();
                        _a = this;
                        _b = {
                            self: this.address
                        };
                        return [4 /*yield*/, this.dispatchCall('parametersAddress')];
                    case 2:
                        _a.addresses = (_b.parameters = _c.sent(),
                            _b);
                        return [2 /*return*/];
                }
            });
        });
    };
    RootRegistry.prototype.item = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.getItem(name)];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, this.unpack(tslib_1.__spread([name], raw))];
                }
            });
        });
    };
    RootRegistry.prototype.itemAtIndex = function (index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.getAtIndex(index)];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, this.unpack(raw)];
                }
            });
        });
    };
    RootRegistry.prototype.create = function (name, style) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name || name.length == 0) {
                            throw new Error("Name must be defined");
                        }
                        else if (!style || style.length == 0) {
                            throw new Error("Vote style must be defined");
                        }
                        // TODO: This sucks, needs to be tuned
                        this.trace.message("Creating registry " + name + " with vote style " + style);
                        return [4 /*yield*/, this.instance.create(name, style, { from: this.context.defaultAccount(), gas: 5000000, gasLimit: 6721975 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.item(name)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RootRegistry.prototype.unpack = function (values) {
        return new RegistryDescriptor(values[0], values[1], values[2], values[3]);
    };
    return RootRegistry;
}(Registry_1.Registry));
exports.RootRegistry = RootRegistry;
//# sourceMappingURL=RootRegistry.js.map