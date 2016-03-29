module.exports = function flatten(array) {
    return (array || []).reduce(function(prep, next) {
        if(!Array.isArray(prep)) {
            prep = [prep];
        }
        if(Array.isArray(next)) {
            next = flatten(next);
        }
        return prep.concat(next);
    });
}