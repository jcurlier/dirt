"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Registry_1 = require("./Registry");
var SimpleRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleRegistry, _super);
    function SimpleRegistry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleRegistry.prototype.item = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.getItem.call(key)];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, this.unpack(tslib_1.__spread([key], raw))];
                }
            });
        });
    };
    SimpleRegistry.prototype.itemAtIndex = function (index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.getAtIndex.call(index)];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, this.unpack(raw)];
                }
            });
        });
    };
    SimpleRegistry.prototype.addItem = function (key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.addItem(key, value, { from: this.context.defaultAccount() })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.item(key)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SimpleRegistry.prototype.editItem = function (key, value) {
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
    SimpleRegistry.prototype.deleteItem = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.deleteItem(key, { from: this.context.defaultAccount() })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SimpleRegistry.prototype.unpack = function (value) {
        return new Registry_1.RegistryItem(this.address, // address
        value[0], // registry key
        value[1], // owner
        value[2], // registry value
        value[3].map(function (i) { return i.toNumber(); }), // blockhistory 
        value[4].toNumber() // timestamp
        );
    };
    return SimpleRegistry;
}(Registry_1.Registry));
exports.SimpleRegistry = SimpleRegistry;
//# sourceMappingURL=SimpleRegistry.js.map