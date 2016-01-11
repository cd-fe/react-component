module.exports = function(obj) {
    var keys = Array.prototype.slice.call(arguments, 1);
    keys.forEach(function(key) {
        delete obj[key];
    });
    return obj;
};