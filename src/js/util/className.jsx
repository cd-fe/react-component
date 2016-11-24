import unique from './unique.jsx';

var combine = function(source, desc) {
    var source_array = (source || "").split(" ");
    var desc_array = desc instanceof Array ? desc : (desc || "").split(" ");
    return source_array.concat(desc_array).join(" ");
};

combine.addClass = function(target, className) {
    if(!combine.hasClass(target, className)) {
        var source = target.className.replace(/\s+/, ' ').split(' ');
        className = className instanceof Array ? className : className.replace(/\s+/, ' ').split(' ');

        var result = unique(source.concat(className));
        target.className = result.join(" ");
    }
};

combine.removeClass = function(target, className) {
    if(combine.hasClass(target, className)) {
        var source = target.className.replace(/\s+/, ' ').split(' ');

        for(var i=0;i<source.length;i++) {
            if(source[i] == className) {
                source.splice(i, 1);
                break;
            }
        }

        target.className = source.join(" ");
    }
};

combine.hasClass = function(target, className) {
    return (" " + target.className + " ").indexOf(" " + className + " ") >= 0;
};

module.exports = combine;