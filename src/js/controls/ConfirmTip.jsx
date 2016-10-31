/**
 * 提示组件
 * @module controls/Tooltip
 */

import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import TimerMixin from '../mixins/TimerMixin.jsx';

import '../../css/confirmtip.scss';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     * @see {@link module:mixins/TimerMixin}
     */
    mixins: [ComponentBase, TimerMixin],
    parentNode: null,
    getInitialState: function () {
        return {
            show: false
        };
    },
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default tooltip
             * @type string
             * @desc 组件名称
             */
            cname: "confirmtip",
            /**
             * @instance
             * @default top-center
             * @type string
             * @desc 显示方位, 分为(top middle bottom)和(left center right)两组，可以分别组合
             * @example
             * top-left         左上角
             * middle-right     正右侧
             * bottom-left      左下角
             */
            align: 'bottom-center',
            /**
             * @instance
             * @default mouseenter
             * @type string
             * @desc 触发显示tooltip的事件
             */
            trigger: 'click',
            buttons: 'submit,cancel',
            submitText: '确认',
            cancelText : '取消',
            onSubmit: null,
            onCancel: null
        };
    },
    submitHandler:function() {
        var result = null;
        if(this.props.onSubmit) {
            result = this.props.onSubmit();
        }

        if(result !== false) {
            this.refs.main.hide();
        }
    },
    cancelHandler:function() {
        this.refs.main.hide();
    },
    render: function () {
        var allname = className(this.props.className, this.getPropClass());
        var props = omit(this.props, 'cname');
        return <RUI.Tooltip ref="main" {...props} className={allname}>
            {this.props.children}
            <div className="rui-confirmtip-right">
                {this.props.buttons.indexOf('submit') > -1 && (
                    <RUI.Button onClick={this.submitHandler}>{this.props.submitText}</RUI.Button>
                )}
                {this.props.buttons.indexOf('cancel') > -1 && (
                    <RUI.Button onClick={this.cancelHandler}>{this.props.cancelText}</RUI.Button>
                )}
            </div>
        </RUI.Tooltip>
    }
});