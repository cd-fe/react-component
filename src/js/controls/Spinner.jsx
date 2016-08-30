/**
 * 数字调节器组件
 * @module controls/Spinner
 */

import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import cap from '../util/capitalize.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/spinner.scss';

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
             * @default spinner
             * @type string
             * @desc 组件名称
             */
            cname: 'spinner',
            /**
             * @instance
             * @default 1
             * @type number
             * @desc 单步递变值
             */
            step: 1,
            /**
             * @instance
             * @default 9999
             * @type number
             * @desc 最大值
             */
            max: 9999,
            /**
             * @instance
             * @default 0
             * @type number
             * @desc 最小值
             */
            min: 0,
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否启用键盘上下键控制
             */
            keyboardEnable: true,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否禁用
             */
            disable: false,
            /**
             * @instance
             * @default blur
             * @type string
             * @desc 手动输入内容后，根据此事件触发内容校正
             */
            eventType: 'blur',
            /**
             * @instance
             * @default null
             * @type function
             * @desc 当内容变更后的回调事件
             * @example
             * changeHandler:function(val) {
             *      console.log(val);
             * }
             */
            onChange: null,
            /**
             * @instance
             * @member
             * @default function(str) {return str;}
             * @type function
             * @desc 对显示的内容进行最后的修改
             */
            fieldFunction: function (str) {
                return str;
            }
        };
    },
    getInitialState: function () {
        return {
            value: this.props.value || (this.props.min + "")
        };
    },
    componentDidMount: function () {
        this.updateKeyboardEvent();
    },
    componentWillUnmount: function () {
        var node = ReactDOM.findDOMNode(this.refs.input);
        $(node).unbind('keydown');
    },
    updateKeyboardEvent: function () {
        var _this = this;

        function keyHandler(e) {
            if (e.keyCode == 38) {
                _this.doCount(1);
                return false;
            }
            if (e.keyCode == 40) {
                _this.doCount(-1);
                return false;
            }
        }

        var node = ReactDOM.findDOMNode(this.refs.input);
        $(node).unbind('keydown');
        if (this.props.keyboardEnable) {
            $(node).bind('keydown', keyHandler);
        }
    },
    /**
     * 获取当前值
     * @instance
     * @returns {number}
     */
    getValue: function () {
        return this.state.value;
    },
    doCount: function (direction, val) {
        if (this.props.disable) {
            return;
        }

        var value = (typeof val == 'number' ? val : (this.state.value ? this.state.value : 0)) + direction * this.props.step;
        value = Math.max(Math.min(value, this.props.max), this.props.min * 1);
        this.setState({
            value: value
        }, function () {
            this.props.onChange && this.props.onChange.call(null, this.state.value, this);
        }.bind(this));
    },
    changeHandler: function (e) {
        var value = e.target.value;
        this.doCount(0, value - (value % this.props.step));
    },
    componentWillReceiveProps: function (nextProps) {
        var update = {};
        var flag = false;
        if (typeof nextProps.value != 'undefined' && nextProps.value != this.state.value) {
            update.value = Math.max(Math.min(nextProps.value, this.props.max), this.props.min);
        }
        if (typeof nextProps.max != 'undefined') {
            update.value = Math.min(nextProps.max, (update.value || this.state.value));
        }
        if (typeof nextProps.min != 'undefined') {
            update.value = Math.max(nextProps.min, (update.value || this.state.value));
        }
        if (typeof nextProps.keyboardEnable !== this.props.keyboardEnable) {
            flag = true;
        }
        this.setState(update, function () {
            flag && this.updateKeyboardEvent();
        }.bind(this));
    },
    render: function () {
        var props = omit(this.props, 'onChange', 'value');
        var classes = className(this.props.className, this.getPropClass());

        var inputProps = {
            ref: "input",
            className: "rui-spinner-input",
            value: this.props.fieldFunction(this.state.value),
            disable: this.props.disable
        };
        inputProps['on' + cap(this.props.eventType)] = this.changeHandler;

        return <div {...props} className={classes}>
            <RUI.Button className="rui-spinner-down" onClick={this.doCount.bind(this, -1)}/>
            <RUI.Input {...inputProps} />
            <RUI.Button className="rui-spinner-up" onClick={this.doCount.bind(this, 1)}/>
        </div>;
    }
});