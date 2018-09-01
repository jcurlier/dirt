"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseContract_1 = require("./BaseContract");
var AsyncEnumerator_1 = require("../util/AsyncEnumerator");
var RegistryItem = /** @class */ (function () {
    function RegistryItem(origin, key, owner, value, blockHistory, timestamp) {
        this.origin = origin;
        this.key = key;
        this.owner = owner;
        this.value = value;
        this.blockHistory = blockHistory;
        this.timestamp = timestamp;
    }
    return RegistryItem;
}());
exports.RegistryItem = RegistryItem;
var Registry = /** @class */ (function (_super) {
    tslib_1.__extends(Registry, _super);
    function Registry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Registry.prototype.has = function (key) {
        return this.instance.hasItem.call(key);
    };
    Registry.prototype.count = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.getItemCount.call()];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, raw.toNumber()];
                }
            });
        });
    };
    Registry.prototype.getEnumerator = function () {
        return new AsyncEnumerator_1.AsyncEnumerator(this);
    };
    return Registry;
}(BaseContract_1.BaseContract));
exports.Registry = Registry;
//# sourceMappingURL=Registry.js.map