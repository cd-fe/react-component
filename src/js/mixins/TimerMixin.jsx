module.exports = {
    __timer:0,
    startTimer:function(callback, delay) {
        this.__timer = setTimeout(callback, delay);
        return this.__timer;
    },
    stopTimer:function() {
        clearTimeout(this.__timer);
    },
    resetTimer:function(callback, delay) {
        this.stopTimer();
        return this.startTimer(callback, delay);
    }
};