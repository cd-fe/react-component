module.exports = function(str) {
    var matches = str.match(/[^\x00-\xff]/g);
    return str.length + (!matches ? 0 : matches.length);
};
