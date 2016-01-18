var eq = function(a, b, aStack, bStack) {
    if (a === b)
        return a !== 0 || 1 / a == 1 / b;
    if (a == null || b == null)
        return a === b;
    var className = Object.prototype.toString.call(a);
    if (className != Object.prototype.toString.call(b))
        return false;

    switch (className) {
        case '[object String]':
            return a == String(b);
        case '[object Number]':
            return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
            return +a == +b;
        case '[object RegExp]':
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
    }
    if ( typeof a != 'object' || typeof b != 'object')
        return false;
    var length = aStack.length;
    while (length--) {
        if (aStack[length] == a)
            return bStack[length] == b;
    }
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && ( aCtor instanceof aCtor) && _.isFunction(bCtor) && ( bCtor instanceof bCtor)) && ('constructor' in a && 'constructor' in b)) {
        return false;
    }
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    if (className == '[object Array]') {
        size = a.length;
        result = size == b.length;
        if (result) {
            while (size--) {
                if (!( result = eq(a[size], b[size], aStack, bStack)))
                    break;
            }
        }
    } else {
        for (var key in a) {
            if (a.hasOwnProperty(key)) {
                size++;
                if (!( result = b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack)))
                    break;
            }
        }
        if (result) {
            for (key in b) {
                if (b.hasOwnProperty(key) && !(size--))
                    break;
            }
            result = !size;
        }
    }
    aStack.pop();
    bStack.pop();
    return result;
};

module.exports = function(source, desc) {
    return eq(source, desc, [], []);
};