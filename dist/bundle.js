(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["react-component-lib"] = factory();
	else
		root["react-component-lib"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Button = __webpack_require__(1);

	var _Button2 = _interopRequireDefault(_Button);

	var _Input = __webpack_require__(7);

	var _Input2 = _interopRequireDefault(_Input);

	var _Pagination = __webpack_require__(9);

	var _Pagination2 = _interopRequireDefault(_Pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RUI = {
	    Button: _Button2.default,
	    Input: _Input2.default,
	    Pagination: _Pagination2.default
	};

	debugger;
	(function (t) {
	    t.RUI = RUI;
	})(window || undefined);

	module.exports = RUI;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _className = __webpack_require__(2);

	var _className2 = _interopRequireDefault(_className);

	var _PropClassMixin = __webpack_require__(3);

	var _PropClassMixin2 = _interopRequireDefault(_PropClassMixin);

	var _ComponentBase = __webpack_require__(5);

	var _ComponentBase2 = _interopRequireDefault(_ComponentBase);

	var _EventDispatcher = __webpack_require__(6);

	var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [_PropClassMixin2.default, _EventDispatcher2.default, _ComponentBase2.default],
	    getDefaultProps: function getDefaultProps() {
	        return {
	            cname: 'button'
	        };
	    },
	    render: function render() {
	        return React.createElement(
	            'a',
	            _extends({}, this.props, { className: (0, _className2.default)(this.props.className, this.getPropClass()) }),
	            this.props.children
	        );
	    }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (source, desc) {
	    var source_array = (source || "").split(" ");
	    var desc_array = desc instanceof Array ? desc : (desc || "").split(" ");
	    return source_array.concat(desc_array).join(" ");
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _constant = __webpack_require__(4);

	var _constant2 = _interopRequireDefault(_constant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	    getPropClass: function getPropClass() {
	        var classes = [];

	        classes.push(_constant2.default.classPrefix + this.props.cname);

	        return classes;
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    classPrefix: 'rui-'
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventDispatcher = (function () {
	    function EventDispatcher() {
	        _classCallCheck(this, EventDispatcher);

	        this.map = new WeakMap();
	    }

	    _createClass(EventDispatcher, [{
	        key: "hasListeners",
	        value: function hasListeners(event) {
	            return this.map.has(event);
	        }
	    }, {
	        key: "addEventListener",
	        value: function addEventListener(event, callback) {}
	    }, {
	        key: "removeEventListener",
	        value: function removeEventListener(event, callback) {}
	    }, {
	        key: "dispatchEvent",
	        value: function dispatchEvent(event) {}
	    }]);

	    return EventDispatcher;
	})();

	var dispatcher = new EventDispatcher();
	module.exports = dispatcher;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _className = __webpack_require__(2);

	var _className2 = _interopRequireDefault(_className);

	var _omit = __webpack_require__(8);

	var _omit2 = _interopRequireDefault(_omit);

	var _PropClassMixin = __webpack_require__(3);

	var _PropClassMixin2 = _interopRequireDefault(_PropClassMixin);

	var _ComponentBase = __webpack_require__(5);

	var _ComponentBase2 = _interopRequireDefault(_ComponentBase);

	var _EventDispatcher = __webpack_require__(6);

	var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [_PropClassMixin2.default, _EventDispatcher2.default, _ComponentBase2.default],
	    getDefaultProps: function getDefaultProps() {
	        return {
	            cname: 'input'
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            value: this.props.value || "",
	            change: this.props.onChange
	        };
	    },
	    changeHandler: function changeHandler(e) {
	        this.setState({
	            value: e.target.value
	        });

	        this.state.change && this.state.change.call(null, e);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            value: props.value,
	            change: props.onChange
	        });
	    },
	    render: function render() {
	        var props = (0, _omit2.default)(this.props, 'type', 'onChange', 'value');
	        return React.createElement('input', _extends({}, props, { type: 'text', value: this.state.value, onChange: this.changeHandler, className: (0, _className2.default)(this.props.className, this.getPropClass()) }));
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (obj) {
	    var keys = Array.prototype.slice.call(arguments, 1);
	    keys.forEach(function (key) {
	        delete obj[key];
	    });
	    return obj;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	module.exports = React.createClass({
	    displayName: "exports",

	    getInitialState: function getInitialState() {
	        return {
	            pageSize: this.props.pageSize || 20,
	            currentPage: this.props.currentPage || 1,
	            totalNum: this.props.totalNum || 108
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            pageSize: props.pageSize,
	            currentPage: props.currentPage,
	            totalNum: props.totalNum
	        });
	    },
	    renderPage: function renderPage() {
	        var pageNumber = Math.ceil(this.state.totalNum / this.state.pageSize);
	        var list = [];
	        for (var i = 1; i <= pageNumber; i++) {
	            list.push(React.createElement(
	                "a",
	                { href: "javascript:;", className: "page-num " + (i == this.state.currentPage ? 'select' : '') },
	                i
	            ));
	        }

	        return list;
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "pager" },
	            React.createElement(
	                "div",
	                { className: "pager-detail" },
	                React.createElement(
	                    "p",
	                    null,
	                    "共 ",
	                    React.createElement(
	                        "span",
	                        null,
	                        this.state.totalNum
	                    ),
	                    " 条，当前第 ",
	                    React.createElement(
	                        "span",
	                        null,
	                        this.state.currentPage
	                    ),
	                    " 页 "
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "pager-list" },
	                React.createElement(
	                    "a",
	                    { href: "javascript:;", className: "page-home " },
	                    "<<"
	                ),
	                React.createElement(
	                    "a",
	                    { href: "javascript:;", className: "page-prev " },
	                    "<"
	                ),
	                this.renderPage(),
	                React.createElement(
	                    "a",
	                    { href: "javascript:;", className: "page-next" },
	                    ">"
	                ),
	                React.createElement(
	                    "a",
	                    { href: "javascript:;", className: "page-end" },
	                    ">>"
	                )
	            )
	        );
	    }
	});

/***/ }
/******/ ])
});
;