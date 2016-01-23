module.exports = function(source) {
    var result = {};
    for(var key in source) {
        if(source.hasOwnProperty(key)) {
            result[key] = source[key];
        }
    }
    return result;
};