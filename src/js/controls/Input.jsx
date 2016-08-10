/**
 * 输入框组件
 * @module controls/Input
 */

import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/input.scss';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default input
             * @type string
             * @desc 组件名称
             */
            cname: 'input',
            /**
             * @instance
             * @default dynamic
             * @type string
             * @desc 输入框模式，分为静态和动态文本，分别为：dynamic(允许用户进行输入) static(显示固定文本)
             */
            mode: 'dynamic',
            type: 'text',
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否禁用文本
             */
            disable: false,
            /**
             * @instance
             * @default null
             * @type function
             * @desc 文本变更时将会调用onChange回调
             * @example
             * changeHandler:function(event) {
             *      console.log(event.target.value);
             * }
             */
            onChange: null
        };
    },
    getInitialState: function () {
        return {
            value: this.props.value || "",
            change: this.props.onChange
        }
    },
    /**
     * 获取当前输入框内的文本
     * @instance
     * @returns {string}
     */
    getValue: function () {
        return this.state.value;
    },
    changeHandler: function (e) {
        if (this.props.mode == 'dynamic') {
            this.setState({
                value: e.target.value
            });
            this.state.change && this.state.change.call(null, e, this);
        }
    },
    focusHandler: function(e) {
        this.props.onFocus && this.props.onFocus(e, this);

        var node = ReactDOM.findDOMNode(this);
        className.addClass(node, 'focused');
    },
    blurHandler: function(e) {
        this.props.onBlur && this.props.onBlur(e, this);

        var node = ReactDOM.findDOMNode(this);
        className.removeClass(node, 'focused');
    },
    keyDownHandler: function(e) {
        this.props.onKeyDown && this.props.onKeyDown(e);
        // enter
        if(e && e.keyCode == 13) {
            this.props.onEnter && this.props.onEnter(e, this);
        }
    },
    componentWillReceiveProps: function (nextProps) {
        var update = {};
        if (typeof nextProps.value != 'undefined') {
            update.value = nextProps.value
        }
        if (typeof nextProps.onChange != 'undefined') {
            update.change = nextProps.onChange;
        }
        this.setState(update);
    },
    render: function () {
        var props = omit(this.props, 'onFocus', 'onChange', 'value', 'readonly');

        if (this.props.disable) {
            props.disabled = true;
        }

        return <input {...props}
            type={this.props.type}
            value={this.state.value+""}
            onChange={this.changeHandler}
            onFocus={this.focusHandler}
            onBlur={this.blurHandler}
            onKeyDown={this.keyDownHandler}
            className={className(this.props.className, this.getPropClass())}
        ></input>;
    }
});