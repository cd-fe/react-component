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
            mode: 'dynamic',
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否使用垂直改变文本域大小功能
             */
            resize:false,
            autoSize:false,
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否显示文本字数限制，该属性必须与maxLength同时存在时才会生效
             */
            showMaxLength:true,
            /**
             * @instance
             * @default undefined
             * @type number
             * @desc 该文本域可输入的最大字符长度，该属性效果根据浏览器实现为准
             */
            maxLength:undefined,
            /**
             * @instance
             * @default function
             * @param value
             * @param max
             * @return {number}
             * @desc “可输入文本长度”的自定义函数，开发者可根据自己的规则进行显示，例如一个汉字作为两个字符长度
             */
            maxLengthHandler:function(value, max) {
                // 非常神奇，在Chrome下，一个\r或者\n居然被浏览器算做两个字符
                return max - (value||"").replace(/[\r\n]/g, '**').length;
            }
        };
    },
    getInitialState: function () {
        return {
            value: typeof this.props.value == 'number' ? (this.props.value+"") : (this.props.value || ""),
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
    autoSizeHandler:function(value) {
        // TODO
    },
    changeHandler: function (e) {
        if (this.props.mode == 'dynamic') {
            if(this.props.autoSize) {
                this.autoSizeHandler(e.target.value);
            }

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
        var showNumber = this.props.maxLengthHandler(this.state.value, this.props.maxLength);

        return <div className="rui-textarea-container">
            {props.resize && (
                <RUI.Icon name="resize" />
            )}
            <textarea ref="textarea" {...props}
                style={props.resize ? {resize:'vertical'} : {}}
                value={this.state.value}
                onChange={this.changeHandler}
                className={className(this.props.className, this.getPropClass())}
                ></textarea>
                <div>
                    {(this.props.maxLength && this.props.showMaxLength) && (
                        <div className="right">
                            <span className="rui-textarea-right">还可以输入<span className={"rui-textarea-limittext " + (showNumber<=0?"warning" : "")}>
                                {Math.max(0, showNumber)}</span>个字
                            </span>
                        </div>
                    )}
                </div>
        </div>;
    }
});