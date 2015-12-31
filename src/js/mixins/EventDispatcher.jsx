class EventDispatcher {
    constructor() {
        this.map = new WeakMap();
    }

    hasListeners(event) {
        return this.map.has(event);
    }

    addEventListener(event, callback) {

    }

    removeEventListener(event, callback) {

    }

    dispatchEvent(event) {

    }
}

var dispatcher = new EventDispatcher();
module.exports = dispatcher;