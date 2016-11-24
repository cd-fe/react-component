/**
 * 单选框组件
 * @module controls/Switch
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';

import '../../css/switch.scss';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     * @see {@link module:mixins/ToggleMixin}
     */
    mixins: [ComponentBase, ToggleMixin],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default switch
             * @type string
             * @desc 组件名称
             */
            cname: 'switch',
            /**
             * @instance
             * @default 0
             * @type number
             * @desc 当前组件选中状态，值为: 0 和 1
             */
            selected: 0,
            /**
             * @instance
             * @default
             * @type string
             * @desc 当前组件代表的值，类似html input标签的value属性
             */
            value: '',
            /**
             * @instance
             * @default null
             * @type function
             * @desc 状态变更时的回调函数
             * @example
             * changeHandler:function(event) {
             *      console.log(event.data.value);
             *      console.log(event.data.selected);
             * }
             */
            onChange: null,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 当前组件是否禁用
             */
            disable: false
        };
    },
    /**
     * 获取当前组件的值
     * @instance
     * @returns {object}
     */
    getValue: function () {
        return {
            value: this.props.value,
            selected: this.toggleValue
        };
    },
    componentDidMount: function () {
        this.toggleValues = ['', 'selected'];
        this.toggleValue = this.props.selected ? 1 : 0;

        var node = ReactDOM.findDOMNode(this);
        $(node).bind('click', this.clickHandler);

        this.forceUpdate();
    },
    componentWillUnmount: function () {
        var node = ReactDOM.findDOMNode(this);
        $(node).unbind('click', this.clickHandler);
    },
    clickHandler: function (event) {
        var change;

        if(!this.props.disable) {
            if (this.props.groupValidate) {
                change = this.props.groupValidate.call(null, event, this);
            } else {
                this.toggle();
                this.forceUpdate();
            }
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (typeof nextProps.selected != 'undefined' && nextProps.selected != this.toggleValue) {
            this.toggleValue = nextProps.selected;
        }
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());

        var array = classes.split(' ');
        var index = array.findIndex(function (item) {
            return item == 'selected';
        });
        if (index >= 0) {
            array = array.splice(index, 1);
        }
        classes = array.join(" ");

        classes += ' ' + this.getToggleResult();

        var props = require('../util/omit.jsx')(this.props, 'onChange');
        return <label {...props} className={classes} selected={this.props.selected}>
            <span className="rui-switch-normalbg"></span>
            <span className="rui-switch-activebg"></span>
            <span className="rui-switch-square"></span>
            {this.props.children}
        </label>
    }
});