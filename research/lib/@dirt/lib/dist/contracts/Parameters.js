"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseContract_1 = require("./BaseContract");
var KnownCoreParameters;
(function (KnownCoreParameters) {
    KnownCoreParameters["TOKEN"] = "TOKEN";
    KnownCoreParameters["ROOT"] = "ROOT";
})(KnownCoreParameters = exports.KnownCoreParameters || (exports.KnownCoreParameters = {}));
var KnownClasses;
(function (KnownClasses) {
    KnownClasses["CORE"] = "CORE";
    KnownClasses["REGISTRY"] = "REGISTRY";
    KnownClasses["VOTE"] = "VOTE";
})(KnownClasses = exports.KnownClasses || (exports.KnownClasses = {}));
var Parameters = /** @class */ (function (_super) {
    tslib_1.__extends(Parameters, _super);
    function Parameters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Parameters.prototype.getAddress = function (class_name, key) {
        return this.instance.getAddress.call(class_name, key);
    };
    Parameters.prototype.setAddress = function (class_name, key, address) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.setAddress(class_name, key, address)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Parameters;
}(BaseContract_1.BaseContract));
exports.Parameters = Parameters;
//# sourceMappingURL=Parameters.js.map