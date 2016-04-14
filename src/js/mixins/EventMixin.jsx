/**
 * 基础事件发布方法
 * @module mixins/EventMixin
 */

import empty from '../util/empty.jsx';
import EventDispatcher from '../managers/EventDispatcher.jsx';

module.exports = {
    __eventDispatcher:null,
    /**
     * 初始化事件发布器
     * @instance
     * @private
     */
    registryEvent:function() {
        this.__eventDispatcher = new EventDispatcher();
    },
    /**
     * 添加事件监听
     * @param {string} event
     * @param {function} callback
     * @instance
     */
    addEventListener:function(event, callback) {
        this.__eventDispatcher.addEventListener(event, callback);
    },
    /**
     * 移除事件监听
     * @param {string} event
     * @param {function} callback
     * @instance
     */
    removeEventListener:function(event, callback) {
        this.__eventDispatcher.removeEventListener(event, callback);
    },
    /**
     * 检测是否对某事件进行监听
     * @instance
     * @param {string} event
     * @return {boolean}
     */
    hasListener:function(event) {
        return this.__eventDispatcher.hasListener(event);
    },
    /**
     * 发布一次事件
     * @instance
     * @param {string} event
     * @param {object} data
     */
    dispatchEvent:function(event, data) {
        this.__eventDispatcher.dispatchEvent(event, data);
    },
    /**
     * 根据当前组件属性，根据属性中类似 on[EventName] 形式进行注册
     * @instance
     */
    bindEvent:function() {
        if(!this.__eventDispatcher) {
            this.registryEvent();
        }

        if(this.props && !empty(this.props)) {
            Object.keys(this.props).forEach(function(key) {
                if(key && key.match(/^on[A-Z]/)) {
                    this.addEventListener(key.replace(/^on[A-Z]/, function(match) {
                        return match.replace(/^on/, '').toLowerCase();
                    }), this.props[key]);
                }
            }.bind(this));
        }
    },
    /**
     * 解绑所有事件
     * @instance
     */
    unbindEvent:function() {
        this.__eventDispatcher.removeAllListener();
    },
    /**
     * 创建一个事件
     * @instance
     * @param {string} type
     * @return {*|Event}
     */
    createEvent:function(type) {
        return this.__eventDispatcher.createEvent(type);
    }
};