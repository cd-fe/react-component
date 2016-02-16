import EventDispatcher from '../managers/EventDispatcher.jsx';
import constant from '../constant.jsx';

var DataSource = function() {
    // extend EventDispatcher
    EventDispatcher.call(this);

    this.__mapping = function(data) {
        return data;
    };

    this.setMapping = function(func) {
        this.__mapping = func;
    };

    this.setData = function(data) {
        if(typeof data == 'function') {
            data.call(null).then(this.setData.bind(this));
        }else {
            var self = this;
            self.length = data.length;
            data.map(function(item, index) {
                self[index] = self.__mapping.call(null, item);
            });

            this.dispatchEvent(constant.events.dataChange, this);
        }
    };

    this.getData = function() {
        return this.__mapping(this);
    };
};

// extend Array
DataSource.prototype = [];

var badFunction = ['sort', 'splice', 'reverse', 'push', 'pop', 'unshift', 'shift'];
badFunction.forEach(function(method) {
    var sourcePrototype = DataSource.prototype[method];
    DataSource.prototype[method] = function() {
        this.dispatchEvent(constant.events.dataChange, this);
        return sourcePrototype.apply(this, arguments);
    };
});

module.exports = DataSource;