module.exports = function(delay, action){
    var last = 0;
    return function(){
        var curr = Date.now();
        if (curr - last > delay){
            action.apply(this, arguments)
            last = curr;
        }
    }
};