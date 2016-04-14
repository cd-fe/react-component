/**
 * Timer工具集合
 * @module mixins/TimerMixin
 */

module.exports = {
    __timer:0,
    /**
     * 开始计时
     * @instance
     * @param {function} callback        - 计时回调
     * @param {number} delay             - 每次回调的延迟时间
     * @return {number}
     */
    startTimer:function(callback, delay) {
        this.__timer = setTimeout(callback, delay);
        return this.__timer;
    },
    /**
     * 停止计时
     * @instance
     */
    stopTimer:function() {
        clearTimeout(this.__timer);
    },
    /**
     * 重置计时，相当于一次 stopTimer 再 startTimer
     * @instance
     * @param {function} callback        - 计时回调
     * @param {number} delay             - 每次回调的延迟时间
     * @return {number}
     */
    resetTimer:function(callback, delay) {
        this.stopTimer();
        return this.startTimer(callback, delay);
    }
};