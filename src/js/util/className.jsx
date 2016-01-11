module.exports = function(source, desc) {
    var source_array = (source || "").split(" ");
    var desc_array = desc instanceof Array ? desc : (desc || "").split(" ");
    return source_array.concat(desc_array).join(" ");
};