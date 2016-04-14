module.exports = function(str) {
    return str.replace(/^\S/, function(s) {
        return s.toUpperCase();
    });
};