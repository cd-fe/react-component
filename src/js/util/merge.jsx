module.exports = function(desc, source) {
    for(var key in source) {
        if(source.hasOwnProperty(key) && typeof desc[key] == 'undefined') {
            desc[key] = source[key];
        }
    }
    return desc;
};