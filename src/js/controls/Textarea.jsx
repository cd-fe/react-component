/**
 * 多行文本组件
 * @module controls/Textarea
 */

import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/textarea.scss';

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
             * @default textarea
             * @type string
             * @desc 组件名称
             */
            cname: 'textarea',
            /**
             * @instance
             * @default dynamic
             * @type string
             * @desc 当前模式，分为静态(static)和动态(dynamic)
             */
            mode: 'dynamic'
        };
    },
    getInitialState: function () {
        return {
            value: this.props.value || "",
            change: this.props.onChange
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
    changeHandler: function (e) {
        if (this.props.mode == 'dynamic') {
            this.setState({
                value: e.target.value
            });

            this.state.change && this.state.change.call(null, e);
        }
    },
    componentWillReceiveProps: function (nextProps) {
        var update = {};
        if (typeof nextProps.value != 'undefined' && nextProps.value != this.state.value) {
            update.value = nextProps.value
        }
        ;
        this.setState(update);
    },
    render: function () {
        var props = omit(this.props, 'type', 'onChange', 'value', 'readonly');
        return <textarea {...props}
            value={this.state.value}
            onChange={this.changeHandler}
            className={className(this.props.className, this.getPropClass())}
            ></textarea>
    }
});