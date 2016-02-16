(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if(typeof exports === 'object') {
        module.exports = factory();
    }
    else {
        root.baseline = factory();
    }
})(this, function() {

    (function(win) {
        var isIE=!!win.ActiveXObject;
        var isIE6=isIE&&!win.XMLHttpRequest;
        var isIE8=isIE&&(win.document && !!win.document.documentMode);
        var isIE7=isIE&&!isIE6&&!isIE8;
        var isIE68 = isIE6 || isIE7 || isIE8;

        win._hack = {
            ie:isIE,
            ie6:isIE6,
            ie7:isIE7,
            ie8:isIE8,
            ie68:isIE68
        };

        var bs_patch = (function() {
            // IE8 window.hasOwnProperty
            win.hasOwnProperty = win.hasOwnProperty || Object.prototype.hasOwnProperty;

            if(Object.defineProperty && !isIE68) {
                return function(impl, obj, method, condition) {
                    if((method && typeof obj[method] == "undefined") || condition) {
                        Object.defineProperty(obj, method, {
                            enumerable: false,
                            configurable: true,
                            writable: false,
                            value: impl
                        });
                    }
                };
            }else {
                return function(impl, obj, method, condition) {
                    if((method && typeof obj[method] == "undefined") || condition) {
                        obj[method] = impl;
                    }
                };
            }
        })();

        var bs_patches = function(impl, obj) {
            for(var key in impl) {
                if(impl !== win && impl.hasOwnProperty(key)) {
                    bs_patch(impl[key], obj, key);
                }
            }
        };

        win.patch = {
            one:bs_patch,
            some:bs_patches
        };
    })(this);
    (function(win) {
        var patch = win.patch;

        patch.some({
            'of':function() {
                return Array.prototype.slice.call(arguments);
            },
            isArray:function(arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            }
        }, Array);

        patch.some({
            entries:function() {
                return Iterator(this);
            },
            every:function(fun) {
                'use strict';
                if (this === void 0 || this === null)
                    throw new TypeError();
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== 'function')
                    throw new TypeError();
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t && !fun.call(thisArg, t[i], i, t))
                        return false;
                }
                return true;
            },
            fill:function(value) {
                var O = Object(this);
                var len = parseInt(O.length);
                var start = arguments[1];
                var relativeStart = parseInt(start) || 0;
                var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
                var end = arguments[2];
                var relativeEnd = end === undefined ? len  : (parseInt(end) || 0);
                var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
                for (; k < final; k++) {
                    O[k] = value;
                }
                return O;
            },
            filter:function(fun) {
                "use strict";
                if (this === void 0 || this === null)
                    throw new TypeError();
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== "function")
                    throw new TypeError();
                var res = [];
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t) {
                        var val = t[i];
                        if (fun.call(thisArg, val, i, t))
                            res.push(val);
                    }
                }
                return res;
            },
            find:function(filter, context) {
                var index = this.findIndex(filter, context);
                if(index >= 0) {
                    return this[index];
                }else {
                    return undefined;
                }
            },
            findIndex:function(filter, context) {
                if(typeof filter != 'function') {
                    throw new TypeError('filter must be a function');
                }
                var list = Object(this);
                var len = list.length >>> 0;
                var value;
                for(var i=0;i<len;i++) {
                    if(i in list) {
                        value = list[i];
                        if(filter.call(context, value, i, list)) {
                            return i;
                        }
                    }
                }
                return -1;
            },
            keys:function() {
                var ite = Iterator(this);
                ite.next = function() {
                    var value = this.iterator[this.current++];
                    if(this.current > this.length) {
                        throw new Error("stop iterate");
                    }
                    return {
                        value:value[0],
                        done:this.current >= this.length
                    };
                };
                return ite;
            },
            forEach:function(callback, thisArgs) {
                var t, k;
                if(this == null) {
                    throw new TypeError('this is null or undefined');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if(typeof callback != 'function') {
                    throw new TypeError('callback is not a function');
                }
                if(thisArgs)
                    t = thisArgs;
                k = 0;
                while(k < len) {
                    var kValue;
                    if(k in o) {
                        kValue = o[k];
                        callback.call(t, kValue, k, o);
                    }
                    k++;
                }
            },
            copyWithin:function(target, start) {
                var O = Object(this);
                var len = parseInt(O.length);
                var relativeTarget = parseInt(target);
                var to = relativeTarget < 0 ? Math.max(len + relativeTarget, 0) : Math.min(relativeTarget, len);
                var relativeStart = parseInt(start);
                var from = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
                var end = arguments[2];
                var relativeEnd = end === undefined ? len : parseInt(end);
                var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
                var count = Math.min(final - from, len - to);

                if (from < to && to < (from + count)) {
                    from = from + count - 1;
                    to = to + count - 1;
                    while (count > 0) {
                        if ( from in O)
                            O[to] = O[from];
                        else
                            delete O[to];
                        from--;
                        to--;
                        count--;
                    }
                } else {
                    while (count > 0) {
                        if ( from in O)
                            O[to] = O[from];
                        else
                            delete O[to];

                        from++;
                        to++;
                        count--;
                    }
                }
                return O;
            },
            indexOf: function (searchElement, fromIndex) {
                if (this === undefined || this === null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var length = this.length >>> 0;
                fromIndex = +fromIndex || 0;
                if (Math.abs(fromIndex) === Infinity) {
                    fromIndex = 0;
                }
                if (fromIndex < 0) {
                    fromIndex += length;
                    if (fromIndex < 0) {
                        fromIndex = 0;
                    }
                }
                for (; fromIndex < length; fromIndex++) {
                    if (this[fromIndex] === searchElement && fromIndex in this) {
                        return fromIndex;
                    }
                }
                return -1;
            },
            lastIndexOf: function(searchElement) {
                'use strict';
                if (this === void 0 || this === null) {
                    throw new TypeError();
                }
                var n, k,
                    t = Object(this),
                    len = t.length >>> 0;
                if (len === 0) {
                    return -1;
                }
                n = len - 1;
                if (arguments.length > 1) {
                    n = Number(arguments[1]);
                    if (n != n) {
                        n = 0;
                    }
                    else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
                    }
                }
                for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
                    if (k in t && t[k] === searchElement) {
                        return k;
                    }
                }
                return -1;
            },
            map:function(callback, thisArg) {
                var T, A, k;
                if (this == null) {
                    throw new TypeError(" this is null or not defined");
                }
                var O = Object(this);
                var len = O.length >>> 0;
                if (typeof callback !== "function") {
                    throw new TypeError(callback + " is not a function");
                }
                if (thisArg) {
                    T = thisArg;
                }
                A = new Array(len);
                k = 0;
                while (k < len) {
                    var kValue, mappedValue;
                    if (k in O) {
                        var Pk = k.toString();
                        kValue = O[Pk];
                        mappedValue = callback.call(T, kValue, k, O);
                        A[Pk] = mappedValue;
                    }
                    k++;
                }
                return A;
            },
            reduce:function(callback) {
                'use strict';
                if (null === this || 'undefined' === typeof this) {
                    throw new TypeError('Array.prototype.reduce called on null or undefined');
                }
                if ('function' !== typeof callback) {
                    throw new TypeError(callback + ' is not a function');
                }
                var t = Object(this), len = t.length >>> 0, k = 0, value;
                if (arguments.length >= 2) {
                    value = arguments[1];
                } else {
                    while (k < len && !k in t) k++;
                    if (k >= len)
                        throw new TypeError('Reduce of empty array with no initial value');
                    value = t[ k++ ];
                }
                for (; k < len; k++) {
                    if (k in t) {
                        value = callback(value, t[k], k, t);
                    }
                }
                return value;
            },
            reduceRight:function(callback) {
                'use strict';
                if (null === this || 'undefined' === typeof this) {
                    throw new TypeError('Array.prototype.reduce called on null or undefined');
                }
                if ('function' !== typeof callback) {
                    throw new TypeError(callback + ' is not a function');
                }
                var t = Object(this), len = t.length >>> 0, k = len - 1, value;
                if (arguments.length >= 2) {
                    value = arguments[1];
                } else {
                    while (k >= 0 && !k in t) k--;
                    if (k < 0)
                        throw new TypeError('Reduce of empty array with no initial value');
                    value = t[ k-- ];
                }
                for (; k >= 0; k--) {
                    if (k in t) {
                        value = callback(value, t[k], k, t);
                    }
                }
                return value;
            },
            some:function(fun) {
                'use strict';
                if (this === void 0 || this === null)
                    throw new TypeError();
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== 'function')
                    throw new TypeError();
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t && fun.call(thisArg, t[i], i, t))
                        return true;
                }
                return false;
            }
        }, Array.prototype);

        patch.one((function() {
            var unshift = Array.prototype.unshift;
            return function() {
                unshift.apply(this, arguments);
                return this.length;
            }
        })(), Array.prototype, 'unshift', win._hack.ie68);

        patch.one((function() {
            var join = Array.prototype.join;
            return function(spec) {
                if(typeof spec == 'undefined')
                    spec = ',';
                return join.apply(this, [spec]);
            }
        })(), Array.prototype, 'join', win._hack.ie68);
    })(this);
// Date
    (function(win) {
        var patch = win.patch;

        patch.some({
            now:function() {
                return new Date().getTime();
            }
        }, Date);

        patch.some({
            parse:(function() {
                var REGEX_ISO_8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
                var superParse = Date.parse;
                var localOffset = -(new Date().getTimezoneOffset());
                var localHours = Math.floor(localOffset / 60);
                var localMinutes = localOffset % 60;

                return function(v) {
                    var matches = REGEX_ISO_8601.exec(v);
                    if(matches) {
                        return Date.UTC(
                            matches[1],
                            (matches[2] || 1) - 1,
                            matches[3] || 1,
                            matches[4] - (matches[8] ? matches[9] ? matches[9] + matches[10] : 0 : localHours) || 0,
                            matches[5] - (matches[8] ? matches[9] ? matches[9] + matches[11] : 0 : localMinutes) || 0,
                            matches[6] || 0,
                            ((matches[7] || 0) + '00').substr(0, 3)
                        );
                    }

                    return superParse.apply(this, arguments);
                };
            })()
        }, Date, 'parse', win._hack.ie);

        patch.some({
            toISOString:(function() {
                function pad(number) {
                    if ( number < 10 ) {
                        return '0' + number;
                    }
                    return number;
                }
                return function() {
                    return this.getUTCFullYear() +
                        '-' + pad(this.getUTCMonth() + 1) +
                        '-' + pad(this.getUTCDate()) +
                        'T' + pad(this.getUTCHours()) +
                        ':' + pad(this.getUTCMinutes()) +
                        ':' + pad(this.getUTCSeconds()) +
                        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
                        'Z';
                };
            })(),
            toJSON:function() {
                return this.toISOString();
            }
        }, Date.prototype);
    })(this);
// Function
    (function(win) {
        var patch = win.patch;

        patch.one(function(oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                            ? this
                            : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        }, Function.prototype, 'bind');
    })(this);
// Iterator
    (function(win) {
        var patch = win.patch;

        patch.one(function(argv) {
            var _Iterator = function() {
                this.length = 0;
                this.current = 0;

                this.source = arguments[0] || [];
                this.iterator = [];
                for(var key in this.source) {
                    if(this.source.hasOwnProperty(key))
                        this.iterator.push([key, this.source[key]]);
                }

                this.length = this.iterator.length;

                this.next = function() {
                    var value = this.iterator[this.current];
                    if(this.current >= this.length) {
                        throw new Error("stop iterate");
                    }
                    return [this.current++, value];
                    // return {
                    // value:value,
                    // done:this.current >= this.length
                    // };
                };
            };

            return new _Iterator(argv);
        }, win, "Iterator");
    })(this);
// JSON
    (function(win) {
        var patch = win.patch;

        patch.one({}, win, 'JSON');
        patch.some({
            parse:function(json) {
                return eval("1," + json);
            },
            stringify:(function() {
                var ARRAY_STR = '[object Array]';
                var OBJECT_STR = '[object Object]';
                var STRING_STR = '[object String]';

                function arrayParser(json) {
                    var result = '[';
                    for(var i=0;i<json.length;i++) {
                        var type = Object.prototype.toString.call(json[i]);
                        if(type == ARRAY_STR) {
                            result += arrayParser(json[i]);
                        }
                        else if(type == OBJECT_STR) {
                            result += objectParser(json[i]);
                        }
                        else if(type == STRING_STR) {
                            result += '"'+json[i]+'"';
                        }
                        else {
                            result += json[i];
                        }
                        if(i < (json.length-1)) {
                            result += ',';
                        }
                    }
                    result += ']';
                    return result;
                }

                function objectParser(json) {
                    var result = '{';
                    for(var key in json) {
                        if(json.hasOwnProperty(key)) {
                            result += '"'+key+'":';
                            var type = Object.prototype.toString.call(json[key]);
                            if(type == ARRAY_STR) {
                                result += arrayParser(json[key]);
                            }
                            else if(type == OBJECT_STR) {
                                result += objectParser(json[key]);
                            }
                            else if(type == STRING_STR) {
                                result += '"'+json[key]+'"';
                            }
                            else {
                                result += json[key];
                            }
                            result += ',';
                        }
                    }
                    result = (result.length > 1 ? result.substring(0, result.length - 1) : result) + '}';
                    return result;
                }

                return function(json) {
                    var result = '';
                    var type = Object.prototype.toString.call(json);
                    if(type == ARRAY_STR) {
                        return arrayParser(json);
                    }
                    if(type == OBJECT_STR) {
                        return objectParser(json);
                    }
                    if(type == STRING_STR) {
                        return '"'+json+'"';
                    }
                    return result += json, result;
                }
            })()
        }, win.JSON);
    })(this);
    (function(win) {
        var patch = win.patch;

        patch.one((function() {
            // Plan One: use two hashmaps to store id-value and id-key
            // Plan Two: use array to simulate map, but performance
            var _Map = function() {
                this.__source__ = [];
                this.size = 0;
            };

            return _Map;
        })(), win, "Map");

        patch.some({
            'delete':function(key) {
                var index = this.__source__findIndex(function(item) {
                    return item[0] === key;
                });
                if(index >= 0) {
                    this.__source__.splice(index, 1);
                }
                this.size = this.__source__.length;
                return this;
            },
            clear:function() {
                this.__source__ = [];
                this.size = 0;
                return this;
            },
            entries:function() {
                return Iterator(this);
            },
            forEach:function(func, argv) {
                this.__source__.forEach(func, argv);
                return this;
            },
            get:function(key) {
                var index = this.__source__.findIndex(function(item) {
                    return item[0] === key;
                });
                return index>=0 ? this.__source__[index][1] : undefined;
            },
            has:function(key) {
                return this.__source__.findIndex(function(item) {
                        return item[0] === key;
                    }) >= 0;
            },
            keys:function() {
                var ite = Iterator(this);
                ite.current = 0;
                ite.next = function _iterator_() {
                    var value = this.iterator[this.current++];
                    if(this.current > this.length) {
                        throw new Error("stop iterate");
                    }
                    return {
                        value:value[0],
                        done:this.current >= this.length
                    };
                };
                return ite;
            },
            set:function(key, value) {
                var pair = [key, value];
                var index = this.__source__.findIndex(function(item) {
                    return item[0] === key;
                });
                if(index >= 0) {
                    this.__source__[index] = pair;
                }else {
                    this.__source__.push(pair);
                }
                this.size = this.__source__.length;
                return this;
            },
            values:function() {
                var ite = Iterator(this);
                ite.current = 0;
                ite.next = function _iterator_() {
                    var value = this.iterator[this.current++];
                    if(this.current > this.length) {
                        throw new Error("stop iterate");
                    }
                    return {
                        value:value[1],
                        done:this.current >= this.length
                    };
                };
                return ite;
            }
        }, win.Map.prototype);
    })(this);
    (function(win) {
        var patch = win.patch;

        patch.some({
            acosh:function(x) {
                return Math.log(x + Math.sqrt(x * x - 1));
            },
            asinh:function(x) {
                return Math.log(x + Math.sqrt(x * x + 1));
            },
            atanh:function(x) {
                return Math.log((1+x)/(1-x)) / 2;
            },
            cbrt:function(x) {
                var y = Math.pow(Math.abs(x), 1/3);
                return x < 0 ? -y : y;
            },
            clz32:function(value) {
                var value = Number(value) >>> 0;
                return value ? 32 - value.toString(2).length : 32;
            },
            cosh:function(x) {
                return (Math.exp(x) + Math.exp(-x)) / 2;
            },
            expm1:function(x) {
                return Math.exp(x) - 1;
            },
            fround:(function() {
                if(typeof win.Float32Array != 'undefined') {
                    return function(x) {
                        var f32 = new Float32Array(1);
                        return f32[0] = x, f32[0];
                    };
                }else {
                    return function(x) {
                        var byteArray = [];
                        var byteString = x.toString(2);
                        var sign = x < 0 ? 1 : 0;
                        var pointIndex = byteString.indexOf('.');
                        var exp = byteString.charAt(0) == '0' ? Math.max(byteString.indexOf('1', pointIndex) - pointIndex, 0) : 0;
                        var sigma = 0;
                        for(var i=Math.max(byteString.indexOf('1'), 0);i<byteString.length && byteArray.length<23;i++) {
                            var ch = byteString.charAt(i);
                            if(ch == '1' || ch == '0') {
                                byteArray.push(ch * 1);
                            }
                        }
                        for(var i=1;i<byteArray.length;i++) {
                            sigma += byteArray[i] * Math.pow(2, -1 * i);
                        }
                        return Math.pow(-1, sign) * (byteArray[0] * 1 + sigma) * Math.pow(2, -1 * exp);
                    };
                }
            })(),
            hypot:function() {
                var y = 0;
                var length = arguments.length;

                for (var i = 0; i < length; i++) {
                    y += arguments[i] * arguments[i];
                }
                return Math.sqrt(y);
            },
            imul:function(a, b) {
                var ah  = (a >>> 16) & 0xffff;
                var al = a & 0xffff;
                var bh  = (b >>> 16) & 0xffff;
                var bl = b & 0xffff;
                return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
            },
            log10:function(x) {
                return Math.log(x) / Math.LN10;
            },
            log1p:function(x) {
                return Math.log(1 + x);
            },
            log2:function(x) {
                return Math.log(x) / Math.LN2;
            },
            sign:function(x) {
                x = x*1;
                if( +x === x ) {
                    return (x === 0) ? x : (x > 0) ? 1 : -1;
                }
                return NaN;
            },
            sinh:function(x) {
                return (Math.exp(x) - Math.exp(-x)) / 2;
            },
            tanh:function(x) {
                if(x == Infinity)
                    return 1;
                return  (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
            },
            trunc:function(x) {
                return x < 0 ? Math.ceil(x) : Math.floor(x);
            }

        }, Math);
    })(this);
    (function(win) {
        var patch = win.patch;

        patch.some({
            EPSILON:2.220446049250313e-16,
            MAX_VALUE:1.7976931348623157e+308,
            MIN_VALUE:5e-324,
            MAX_SAFE_VALUE:9007199254740992,
            MIN_SAFE_VALUE:-9007199254740992,
            NEGATIVE_INFINITY:-Infinity,
            POSITIVE_INFINITY:Infinity,
            "NaN":NaN,
            isFinite:function(val) {
                if(typeof val == 'number') {
                    return win.isFinite(val);
                }
                return false;
            },
            isInteger:function isInteger (val) {
                return typeof val === "number" && isFinite(val) && val > Number.MIN_SAFE_VALUE && val < Number.MAX_SAFE_VALUE && Math.floor(val) === val;
            },
            isNaN:isNaN,
            parseFloat:parseFloat,
            parseInt:parseInt,
            toInteger:function(val) {
                return val | 0;
            }
        }, Number);
    })(this);
    (function(win) {
        var patch = win.patch;

        patch.some({
            seal:function(obj) {
                return obj;
            },
            freeze:function(obj) {
                return obj;
            },
            preventExtensions:function(obj) {
                return obj;
            },
            setPrototypeOf:function(obj, proto) {
                obj.__proto__ = proto;
                return obj;
            },
            is:function(v1, v2) {
                if (v1 === 0 && v2 === 0) {
                    return 1 / v1 === 1 / v2;
                }
                if (v1 !== v1) {
                    return v2 !== v2;
                }
                return v1 === v2;
            }
        }, Object);

        patch.one((function() {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString : null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function(obj) {
                if ( typeof obj !== 'object' && ( typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for ( i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        })(), Object, 'keys');

        patch.one((function() {
            var _Proxy;
            _Proxy = function () {

            };

            return _Proxy;
        })(), win, 'Proxy');

        patch.one((function() {
            var _Float32Array = function (array) {
                if (typeof array === 'number') {
                    this.length = array;
                } else if ('length' in array) {
                    this.length = array.length;
                    for (var i = 0, len = array.length; i < len; i++) {
                        this[i] = +array[i];
                    }
                }
            };

            _Float32Array.prototype = [];
            return _Float32Array;
        })(), win, 'Float32Array');
    })(this);

    /*!
     * https://github.com/es-shims/es5-shim
     * @license es5-shim Copyright 2009-2015 by contributors, MIT License
     * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
     */

// vim: ts=4 sts=4 sw=4 expandtab

// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
    ;

// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/returnExports.js
    (function (root, factory) {
        'use strict';

        /* global define, exports, module */
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(factory);
        } else if (typeof exports === 'object') {
            // Node. Does not work with strict CommonJS, but
            // only CommonJS-like enviroments that support module.exports,
            // like Node.
            module.exports = factory();
        } else {
            // Browser globals (root is window)
            root.returnExports = factory();
        }
    }(this, function () {

        var call = Function.prototype.call;
        var prototypeOfObject = Object.prototype;
        var owns = call.bind(prototypeOfObject.hasOwnProperty);
        var propertyIsEnumerable = call.bind(prototypeOfObject.propertyIsEnumerable);
        var toStr = call.bind(prototypeOfObject.toString);

// If JS engine supports accessors creating shortcuts.
        var defineGetter;
        var defineSetter;
        var lookupGetter;
        var lookupSetter;
        var supportsAccessors = owns(prototypeOfObject, '__defineGetter__');
        if (supportsAccessors) {
            /* eslint-disable no-underscore-dangle */
            defineGetter = call.bind(prototypeOfObject.__defineGetter__);
            defineSetter = call.bind(prototypeOfObject.__defineSetter__);
            lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
            lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
            /* eslint-enable no-underscore-dangle */
        }

// ES5 15.2.3.2
// http://es5.github.com/#x15.2.3.2
        if (!Object.getPrototypeOf) {
            // https://github.com/es-shims/es5-shim/issues#issue/2
            // http://ejohn.org/blog/objectgetprototypeof/
            // recommended by fschaefer on github
            //
            // sure, and webreflection says ^_^
            // ... this will nerever possibly return null
            // ... Opera Mini breaks here with infinite loops
            Object.getPrototypeOf = function getPrototypeOf(object) {
                /* eslint-disable no-proto */
                var proto = object.__proto__;
                /* eslint-enable no-proto */
                if (proto || proto === null) {
                    return proto;
                } else if (toStr(object.constructor) === '[object Function]') {
                    return object.constructor.prototype;
                } else if (object instanceof Object) {
                    return prototypeOfObject;
                } else {
                    // Correctly return null for Objects created with `Object.create(null)`
                    // (shammed or native) or `{ __proto__: null}`.  Also returns null for
                    // cross-realm objects on browsers that lack `__proto__` support (like
                    // IE <11), but that's the best we can do.
                    return null;
                }
            };
        }

// ES5 15.2.3.3
// http://es5.github.com/#x15.2.3.3

        var doesGetOwnPropertyDescriptorWork = function doesGetOwnPropertyDescriptorWork(object) {
            try {
                object.sentinel = 0;
                return Object.getOwnPropertyDescriptor(object, 'sentinel').value === 0;
            } catch (exception) {
                return false;
            }
        };

// check whether getOwnPropertyDescriptor works if it's given. Otherwise, shim partially.
        if (Object.defineProperty) {
            var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork({});
            var getOwnPropertyDescriptorWorksOnDom = typeof document === 'undefined' ||
                doesGetOwnPropertyDescriptorWork(document.createElement('div'));
            if (!getOwnPropertyDescriptorWorksOnDom || !getOwnPropertyDescriptorWorksOnObject) {
                var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
            }
        }

        if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
            var ERR_NON_OBJECT = 'Object.getOwnPropertyDescriptor called on a non-object: ';

            /* eslint-disable no-proto */
            Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
                if ((typeof object !== 'object' && typeof object !== 'function') || object === null) {
                    throw new TypeError(ERR_NON_OBJECT + object);
                }

                // make a valiant attempt to use the real getOwnPropertyDescriptor
                // for I8's DOM elements.
                if (getOwnPropertyDescriptorFallback) {
                    try {
                        return getOwnPropertyDescriptorFallback.call(Object, object, property);
                    } catch (exception) {
                        // try the shim if the real one doesn't work
                    }
                }

                var descriptor;

                // If object does not owns property return undefined immediately.
                if (!owns(object, property)) {
                    return descriptor;
                }

                // If object has a property then it's for sure `configurable`, and
                // probably `enumerable`. Detect enumerability though.
                descriptor = {
                    enumerable: propertyIsEnumerable(object, property),
                    configurable: true
                };

                // If JS engine supports accessor properties then property may be a
                // getter or setter.
                if (supportsAccessors) {
                    // Unfortunately `__lookupGetter__` will return a getter even
                    // if object has own non getter property along with a same named
                    // inherited getter. To avoid misbehavior we temporary remove
                    // `__proto__` so that `__lookupGetter__` will return getter only
                    // if it's owned by an object.
                    var prototype = object.__proto__;
                    var notPrototypeOfObject = object !== prototypeOfObject;
                    // avoid recursion problem, breaking in Opera Mini when
                    // Object.getOwnPropertyDescriptor(Object.prototype, 'toString')
                    // or any other Object.prototype accessor
                    if (notPrototypeOfObject) {
                        object.__proto__ = prototypeOfObject;
                    }

                    var getter = lookupGetter(object, property);
                    var setter = lookupSetter(object, property);

                    if (notPrototypeOfObject) {
                        // Once we have getter and setter we can put values back.
                        object.__proto__ = prototype;
                    }

                    if (getter || setter) {
                        if (getter) {
                            descriptor.get = getter;
                        }
                        if (setter) {
                            descriptor.set = setter;
                        }
                        // If it was accessor property we're done and return here
                        // in order to avoid adding `value` to the descriptor.
                        return descriptor;
                    }
                }

                // If we got this far we know that object has an own property that is
                // not an accessor so we set it as a value and return descriptor.
                descriptor.value = object[property];
                descriptor.writable = true;
                return descriptor;
            };
            /* eslint-enable no-proto */
        }

// ES5 15.2.3.4
// http://es5.github.com/#x15.2.3.4
        if (!Object.getOwnPropertyNames) {
            Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
                return Object.keys(object);
            };
        }

// ES5 15.2.3.5
// http://es5.github.com/#x15.2.3.5
        if (!Object.create) {

            // Contributed by Brandon Benvie, October, 2012
            var createEmpty;
            var supportsProto = !({ __proto__: null } instanceof Object);
            // the following produces false positives
            // in Opera Mini => not a reliable check
            // Object.prototype.__proto__ === null

            // Check for document.domain and active x support
            // No need to use active x approach when document.domain is not set
            // see https://github.com/es-shims/es5-shim/issues/150
            // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
            /* global ActiveXObject */
            var shouldUseActiveX = function shouldUseActiveX() {
                // return early if document.domain not set
                if (!document.domain) {
                    return false;
                }

                try {
                    return !!new ActiveXObject('htmlfile');
                } catch (exception) {
                    return false;
                }
            };

            // This supports IE8 when document.domain is used
            // see https://github.com/es-shims/es5-shim/issues/150
            // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
            var getEmptyViaActiveX = function getEmptyViaActiveX() {
                var empty;
                var xDoc;

                xDoc = new ActiveXObject('htmlfile');

                xDoc.write('<script><\/script>');
                xDoc.close();

                empty = xDoc.parentWindow.Object.prototype;
                xDoc = null;

                return empty;
            };

            // The original implementation using an iframe
            // before the activex approach was added
            // see https://github.com/es-shims/es5-shim/issues/150
            var getEmptyViaIFrame = function getEmptyViaIFrame() {
                var iframe = document.createElement('iframe');
                var parent = document.body || document.documentElement;
                var empty;

                iframe.style.display = 'none';
                parent.appendChild(iframe);
                /* eslint-disable no-script-url */
                iframe.src = 'javascript:';
                /* eslint-enable no-script-url */

                empty = iframe.contentWindow.Object.prototype;
                parent.removeChild(iframe);
                iframe = null;

                return empty;
            };

            /* global document */
            if (supportsProto || typeof document === 'undefined') {
                createEmpty = function () {
                    return { __proto__: null };
                };
            } else {
                // In old IE __proto__ can't be used to manually set `null`, nor does
                // any other method exist to make an object that inherits from nothing,
                // aside from Object.prototype itself. Instead, create a new global
                // object and *steal* its Object.prototype and strip it bare. This is
                // used as the prototype to create nullary objects.
                createEmpty = function () {
                    // Determine which approach to use
                    // see https://github.com/es-shims/es5-shim/issues/150
                    var empty = shouldUseActiveX() ? getEmptyViaActiveX() : getEmptyViaIFrame();

                    delete empty.constructor;
                    delete empty.hasOwnProperty;
                    delete empty.propertyIsEnumerable;
                    delete empty.isPrototypeOf;
                    delete empty.toLocaleString;
                    delete empty.toString;
                    delete empty.valueOf;

                    var Empty = function Empty() {};
                    Empty.prototype = empty;
                    // short-circuit future calls
                    createEmpty = function () {
                        return new Empty();
                    };
                    return new Empty();
                };
            }

            Object.create = function create(prototype, properties) {

                var object;
                var Type = function Type() {}; // An empty constructor.

                if (prototype === null) {
                    object = createEmpty();
                } else {
                    if (typeof prototype !== 'object' && typeof prototype !== 'function') {
                        // In the native implementation `parent` can be `null`
                        // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
                        // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
                        // like they are in modern browsers. Using `Object.create` on DOM elements
                        // is...err...probably inappropriate, but the native version allows for it.
                        throw new TypeError('Object prototype may only be an Object or null'); // same msg as Chrome
                    }
                    Type.prototype = prototype;
                    object = new Type();
                    // IE has no built-in implementation of `Object.getPrototypeOf`
                    // neither `__proto__`, but this manually setting `__proto__` will
                    // guarantee that `Object.getPrototypeOf` will work as expected with
                    // objects created using `Object.create`
                    /* eslint-disable no-proto */
                    object.__proto__ = prototype;
                    /* eslint-enable no-proto */
                }

                if (properties !== void 0) {
                    Object.defineProperties(object, properties);
                }

                return object;
            };
        }

// ES5 15.2.3.6
// http://es5.github.com/#x15.2.3.6

// Patch for WebKit and IE8 standard mode
// Designed by hax <hax.github.com>
// related issue: https://github.com/es-shims/es5-shim/issues#issue/5
// IE8 Reference:
//     http://msdn.microsoft.com/en-us/library/dd282900.aspx
//     http://msdn.microsoft.com/en-us/library/dd229916.aspx
// WebKit Bugs:
//     https://bugs.webkit.org/show_bug.cgi?id=36423

        var doesDefinePropertyWork = function doesDefinePropertyWork(object) {
            try {
                Object.defineProperty(object, 'sentinel', {});
                return 'sentinel' in object;
            } catch (exception) {
                return false;
            }
        };

// check whether defineProperty works if it's given. Otherwise,
// shim partially.
        if (Object.defineProperty) {
            var definePropertyWorksOnObject = doesDefinePropertyWork({});
            var definePropertyWorksOnDom = typeof document === 'undefined' ||
                doesDefinePropertyWork(document.createElement('div'));
            if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
                var definePropertyFallback = Object.defineProperty,
                    definePropertiesFallback = Object.defineProperties;
            }
        }

        if (!Object.defineProperty || definePropertyFallback) {
            var ERR_NON_OBJECT_DESCRIPTOR = 'Property description must be an object: ';
            var ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object: ';
            var ERR_ACCESSORS_NOT_SUPPORTED = 'getters & setters can not be defined on this javascript engine';

            Object.defineProperty = function defineProperty(object, property, descriptor) {
                if ((typeof object !== 'object' && typeof object !== 'function') || object === null) {
                    throw new TypeError(ERR_NON_OBJECT_TARGET + object);
                }
                if ((typeof descriptor !== 'object' && typeof descriptor !== 'function') || descriptor === null) {
                    throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
                }
                // make a valiant attempt to use the real defineProperty
                // for I8's DOM elements.
                if (definePropertyFallback) {
                    try {
                        return definePropertyFallback.call(Object, object, property, descriptor);
                    } catch (exception) {
                        // try the shim if the real one doesn't work
                    }
                }

                // If it's a data property.
                if ('value' in descriptor) {
                    // fail silently if 'writable', 'enumerable', or 'configurable'
                    // are requested but not supported
                    /*
                     // alternate approach:
                     if ( // can't implement these features; allow false but not true
                     ('writable' in descriptor && !descriptor.writable) ||
                     ('enumerable' in descriptor && !descriptor.enumerable) ||
                     ('configurable' in descriptor && !descriptor.configurable)
                     ))
                     throw new RangeError(
                     'This implementation of Object.defineProperty does not support configurable, enumerable, or writable.'
                     );
                     */

                    if (supportsAccessors && (lookupGetter(object, property) || lookupSetter(object, property))) {
                        // As accessors are supported only on engines implementing
                        // `__proto__` we can safely override `__proto__` while defining
                        // a property to make sure that we don't hit an inherited
                        // accessor.
                        /* eslint-disable no-proto */
                        var prototype = object.__proto__;
                        object.__proto__ = prototypeOfObject;
                        // Deleting a property anyway since getter / setter may be
                        // defined on object itself.
                        delete object[property];
                        object[property] = descriptor.value;
                        // Setting original `__proto__` back now.
                        object.__proto__ = prototype;
                        /* eslint-enable no-proto */
                    } else {
                        object[property] = descriptor.value;
                    }
                } else {
                    if (!supportsAccessors && (('get' in descriptor) || ('set' in descriptor))) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    // If we got that far then getters and setters can be defined !!
                    if ('get' in descriptor) {
                        defineGetter(object, property, descriptor.get);
                    }
                    if ('set' in descriptor) {
                        defineSetter(object, property, descriptor.set);
                    }
                }
                return object;
            };
        }

// ES5 15.2.3.7
// http://es5.github.com/#x15.2.3.7
        if (!Object.defineProperties || definePropertiesFallback) {
            Object.defineProperties = function defineProperties(object, properties) {
                // make a valiant attempt to use the real defineProperties
                if (definePropertiesFallback) {
                    try {
                        return definePropertiesFallback.call(Object, object, properties);
                    } catch (exception) {
                        // try the shim if the real one doesn't work
                    }
                }

                Object.keys(properties).forEach(function (property) {
                    if (property !== '__proto__') {
                        Object.defineProperty(object, property, properties[property]);
                    }
                });
                return object;
            };
        }

// ES5 15.2.3.8
// http://es5.github.com/#x15.2.3.8
        if (!Object.seal) {
            Object.seal = function seal(object) {
                if (Object(object) !== object) {
                    throw new TypeError('Object.seal can only be called on Objects.');
                }
                // this is misleading and breaks feature-detection, but
                // allows "securable" code to "gracefully" degrade to working
                // but insecure code.
                return object;
            };
        }

// ES5 15.2.3.9
// http://es5.github.com/#x15.2.3.9
        if (!Object.freeze) {
            Object.freeze = function freeze(object) {
                if (Object(object) !== object) {
                    throw new TypeError('Object.freeze can only be called on Objects.');
                }
                // this is misleading and breaks feature-detection, but
                // allows "securable" code to "gracefully" degrade to working
                // but insecure code.
                return object;
            };
        }

// detect a Rhino bug and patch it
        try {
            Object.freeze(function () {});
        } catch (exception) {
            Object.freeze = (function (freezeObject) {
                return function freeze(object) {
                    if (typeof object === 'function') {
                        return object;
                    } else {
                        return freezeObject(object);
                    }
                };
            }(Object.freeze));
        }

// ES5 15.2.3.10
// http://es5.github.com/#x15.2.3.10
        if (!Object.preventExtensions) {
            Object.preventExtensions = function preventExtensions(object) {
                if (Object(object) !== object) {
                    throw new TypeError('Object.preventExtensions can only be called on Objects.');
                }
                // this is misleading and breaks feature-detection, but
                // allows "securable" code to "gracefully" degrade to working
                // but insecure code.
                return object;
            };
        }

// ES5 15.2.3.11
// http://es5.github.com/#x15.2.3.11
        if (!Object.isSealed) {
            Object.isSealed = function isSealed(object) {
                if (Object(object) !== object) {
                    throw new TypeError('Object.isSealed can only be called on Objects.');
                }
                return false;
            };
        }

// ES5 15.2.3.12
// http://es5.github.com/#x15.2.3.12
        if (!Object.isFrozen) {
            Object.isFrozen = function isFrozen(object) {
                if (Object(object) !== object) {
                    throw new TypeError('Object.isFrozen can only be called on Objects.');
                }
                return false;
            };
        }

// ES5 15.2.3.13
// http://es5.github.com/#x15.2.3.13
        if (!Object.isExtensible) {
            Object.isExtensible = function isExtensible(object) {
                // 1. If Type(O) is not Object throw a TypeError exception.
                if (Object(object) !== object) {
                    throw new TypeError('Object.isExtensible can only be called on Objects.');
                }
                // 2. Return the Boolean value of the [[Extensible]] internal property of O.
                var name = '';
                while (owns(object, name)) {
                    name += '?';
                }
                object[name] = true;
                var returnValue = owns(object, name);
                delete object[name];
                return returnValue;
            };
        }

    }));
    (function(win) {
        var patch = win.patch;

        patch.one((function() {
            var _Promise = function(handler) {
                var queue = [];

                function next(i, val) {
                    setTimeout(function() {
                        while (queue.length) {
                            var arr = queue.shift()
                            if (typeof arr[i] === 'function') {
                                try {
                                    var chain = arr[i](val)
                                } catch (e) {
                                    return reject(e)
                                }
                                if (chain && typeof chain.then === 'function') {
                                    return chain.then(resolve, reject)
                                } else {
                                    return _Promise.resolve(chain).then(resolve, reject)
                                }
                            }
                        }
                    }, 1);
                }

                function resolve(value) {
                    next(0, value);
                }

                function reject(message) {
                    next(1, message);
                }

                handler(resolve, reject);

                this.then = function(resolve, reject) {
                    queue.push([resolve, reject]);
                    return this;
                };
                this.chain = this.then;

                this['catch'] = function(reject) {
                    return this.then(undefined, reject);
                };
            };

            _Promise.deferred = function() {
                var result = [];
                result.promise = new _Promise(function(resolve, reject) {
                    result.resolve = resolve;
                    result.reject = reject;
                });
                return result;
            };

            _Promise.resolve = _Promise.cast = function(value) {
                return new _Promise(function(resolve) {
                    resolve(value)
                });
            };

            _Promise.reject = function(message) {
                return new _Promise(function(resolve, reject) {
                    reject(message);
                });
            };

            _Promise.all = function(values) {
                var defer = _Promise.deferred();
                var len = values.length;
                var result = [];

                function resolve(value, i) {
                    result[i] = value;
                    len--;

                    if(len == 0) {
                        defer.resolve(result);
                    }
                }

                function reject(message) {
                    defer.reject(message);
                }

                values.forEach(function(item, i) {
                    if(!(item instanceof _Promise)) {
                        resolve(item, i);
                        return;
                    }

                    item.then(function(value) {
                        resolve(value, i);
                    }, function(message) {
                        reject(message);
                    });
                });

                return defer.promise;
            };

            _Promise.race = function(values) {
                var defer = _Promise.deferred();
                var first = true;

                function resolve(value, i) {
                    if(first) {
                        defer.resolve(value);
                        first = false;
                    }
                }

                function reject(message) {
                    if(first) {
                        defer.reject(message);
                        first = false;
                    }
                }

                values.forEach(function(item, i) {
                    if(!(item instanceof _Promise)) {
                        resolve(item, i);
                        return;
                    }

                    item.then(function(value) {
                        resolve(value, i);
                    }, function(message) {
                        reject(message);
                    });
                });

                return defer.promise;
            };

            return _Promise;
        })(), win, 'Promise');

        patch.some({
            defer:win.Promise.deferred
        }, win.Promise);
    })(this);
    (function(win) {
        var patch = win.patch;

        patch.one((function() {
            var _Set = function() {
                this.__source__ = [];
                this.size = 0;
            };

            patch.some({
                'delete':function(key) {
                    var index = this.__source__findIndex(function(item) {
                        return item === key;
                    });
                    if(index >= 0) {
                        this.__source__.splice(index, 1);
                    }
                    this.size = this.__source__.length;
                    return this;
                },
                clear:function() {
                    this.__source__ = [];
                    this.size = 0;
                    return this;
                },
                entries:function() {
                    return Iterator(this);
                },
                forEach:function(func, argv) {
                    this.__source__.forEach(func, argv);
                    return this;
                },
                has:function(key) {
                    return this.__source__.findIndex(function(item) {
                            return item === key;
                        }) >= 0;
                },
                add:function(value) {
                    this.__source__.push(value);
                    return this;
                },
                values:function() {
                    var ite = Iterator(this);
                    ite.current = 0;
                    ite.next = function _iterator_() {
                        var value = this.iterator[this.current++];
                        if(this.current > this.length) {
                            throw new Error("stop iterate");
                        }
                        return {
                            value:value,
                            done:this.current >= this.length
                        };
                    };
                    return ite;
                }
            }, _Set.prototype);

            return _Set;
        })(), win, 'Set');

        patch.some({
            codePointAt:function(position) {
                'use strict'; // needed to support `apply`/`call` with `undefined`/`null`

                if (this == null) {
                    throw TypeError();
                }
                var string = String(this);
                var size = string.length;

                var index = position ? Number(position) : 0;
                if (index != index) { // better `isNaN`
                    index = 0;
                }
                if (index < 0 || index >= size) {
                    return undefined;
                }

                var first = string.charCodeAt(index);
                var second;
                if ( first >= 0xD800 && first <= 0xDBFF && size > index + 1 ) {
                    second = string.charCodeAt(index + 1);
                    if (second >= 0xDC00 && second <= 0xDFFF) {
                        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                    }
                }
                return first;
            },
            contains:function() {
                return String.prototype.indexOf.apply(this, arguments) !== -1;
            },
            endsWith:(function() {
                'use strict';
                var toString = {}.toString;
                return function endsWith(search) {
                    if (this == null) {
                        throw TypeError();
                    }
                    var string = String(this);
                    if (search && toString.call(search) == '[object RegExp]') {
                        throw TypeError();
                    }
                    var stringLength = string.length;
                    var searchString = String(search);
                    var searchLength = searchString.length;
                    var pos = stringLength;
                    if (arguments.length > 1) {
                        var position = arguments[1];
                        if (position !== undefined) {
                            // `ToInteger`
                            pos = position ? Number(position) : 0;
                            if (pos != pos) { // better `isNaN`
                                pos = 0;
                            }
                        }
                    }
                    var end = Math.min(Math.max(pos, 0), stringLength);
                    var start = end - searchLength;
                    if (start < 0) {
                        return false;
                    }
                    var index = -1;
                    while (++index < searchLength) {
                        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                            return false;
                        }
                    }
                    return true;
                };
            })(),
            repeat:function(count) {
                if(typeof count != 'number') {
                    throw new TypeError();
                }
                if(!isFinite(count) || count < 0) {
                    throw new RangeError();
                }
                count = count | 0;

                var result = "";
                for(var i=0;i<count;i++) {
                    result += this.toString();
                }
                return result;
            },
            startsWith:function(search) {
                var toString = {}.toString;
                if (this == null) {
                    throw TypeError();
                }
                var string = String(this);
                if (search && toString.call(search) == '[object RegExp]') {
                    throw TypeError();
                }
                var stringLength = string.length;
                var searchString = String(search);
                var searchLength = searchString.length;
                var position = arguments.length > 1 ? arguments[1] : undefined;
                var pos = position ? Number(position) : 0;
                if (pos != pos) {
                    pos = 0;
                }
                var start = Math.min(Math.max(pos, 0), stringLength);
                if (searchLength + start > stringLength) {
                    return false;
                }
                var index = -1;
                while (++index < searchLength) {
                    if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                        return false;
                    }
                }
                return true;
            },
            trim:function() {
                return this.trimLeft().trimRight();
            },
            trimLeft:function() {
                return this.replace(/^\s+/g, '');
            },
            trimRight:function() {
                return this.replace(/\s+$/g, '');
            }
        }, String.prototype);

        patch.some({
            fromCodePoint: (function() {
                var stringFromCharCode = String.fromCharCode;
                var floor = Math.floor;
                return function fromCodePoint() {
                    var MAX_SIZE = 0x4000;
                    var codeUnits = [];
                    var highSurrogate;
                    var lowSurrogate;
                    var index = -1;
                    var length = arguments.length;
                    if (!length) {
                        return '';
                    }
                    var result = '';
                    while (++index < length) {
                        var codePoint = Number(arguments[index]);
                        if (
                            !isFinite(codePoint) ||
                            codePoint < 0 ||
                            codePoint > 0x10FFFF ||
                            floor(codePoint) != codePoint
                        ) {
                            throw RangeError('Invalid code point: ' + codePoint);
                        }
                        if (codePoint <= 0xFFFF) {
                            codeUnits.push(codePoint);
                        } else {
                            codePoint -= 0x10000;
                            highSurrogate = (codePoint >> 10) + 0xD800;
                            lowSurrogate = (codePoint % 0x400) + 0xDC00;
                            codeUnits.push(highSurrogate, lowSurrogate);
                        }
                        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                            result += stringFromCharCode.apply(null, codeUnits);
                            codeUnits.length = 0;
                        }
                    }
                    return result;
                };
            })()
        }, String);
    })(this);

});