"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BatchAsyncEnumerator = /** @class */ (function () {
    function BatchAsyncEnumerator(source, batchSize) {
        if (batchSize === void 0) { batchSize = 10; }
        this.source = source;
        this.batchSize = batchSize;
        this.count = -1;
        this.current = null;
        this.index = 0;
        this.cacheIndex = 0;
    }
    BatchAsyncEnumerator.prototype.next = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.count == -1)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.source.count()];
                    case 1:
                        _a.count = _c.sent();
                        _c.label = 2;
                    case 2:
                        if (this.index == this.count) {
                            return [2 /*return*/, false];
                        }
                        if (this.popCache()) {
                            return [2 /*return*/, true];
                        }
                        _b = this;
                        return [4 /*yield*/, this.source.itemsAtIndex(this.cacheIndex, this.batchSize)];
                    case 3:
                        _b.cache = _c.sent();
                        this.cacheIndex += this.cache.length;
                        return [2 /*return*/, this.popCache()];
                }
            });
        });
    };
    BatchAsyncEnumerator.prototype.reset = function () {
        this.index = 0;
        this.current = null;
    };
    BatchAsyncEnumerator.prototype.popCache = function () {
        if (this.cache.length <= 0) {
            return false;
        }
        this.current = this.cache.shift();
        this.index++;
        return true;
    };
    return BatchAsyncEnumerator;
}());
exports.BatchAsyncEnumerator = BatchAsyncEnumerator;
var AsyncEnumerator = /** @class */ (function () {
    function AsyncEnumerator(source) {
        this.source = source;
        this.count = -1;
        this.current = null;
        this.index = 0;
    }
    AsyncEnumerator.prototype.next = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.count == -1)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.source.count()];
                    case 1:
                        _a.count = _c.sent();
                        _c.label = 2;
                    case 2:
                        if (this.index == this.count) {
                            return [2 /*return*/, false];
                        }
                        _b = this;
                        return [4 /*yield*/, this.source.itemAtIndex(this.index)];
                    case 3:
                        _b.current = _c.sent();
                        this.index++;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AsyncEnumerator.prototype.reset = function () {
        this.index = 0;
        this.current = null;
    };
    return AsyncEnumerator;
}());
exports.AsyncEnumerator = AsyncEnumerator;
//# sourceMappingURL=AsyncEnumerator.js.map