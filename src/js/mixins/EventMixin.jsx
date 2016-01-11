import empty from '../util/empty.jsx';
import EventDispatcher from '../managers/EventDispatcher.jsx';

module.exports = {
    __eventDispatcher:null,
    registryEvent:function() {
        this.__eventDispatcher = new EventDispatcher();
    },
    addEventListener:function(event, callback) {
        this.__eventDispatcher.addEventListener(event, callback);
    },
    removeEventListener:function(event, callback) {
        this.__eventDispatcher.removeEventListener(event, callback);
    },
    hasListener:function(event) {
        this.__eventDispatcher.hasListener(event);
    },
    dispatchEvent:function(event, data) {
        this.__eventDispatcher.dispatchEvent(event, data);
    },
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
    unbindEvent:function() {
        this.__eventDispatcher.removeAllListener();
    }
};