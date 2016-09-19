/**
 * 弹出层组件
 * @module controls/Dialog
 */
import className from '../util/className.jsx';
import OverlayMixin from '../mixins/OverlayMixin.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Button from './Button.jsx';
import Draggable from 'react-draggable-browser';
import Icon from './Icon.jsx';

import '../../css/dialog.scss';

var Dialog = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     * @see {@link module:mixins/OverlayMixin}
     */
    mixins: [ComponentBase, OverlayMixin],
    getInitialState: function () {
        return {
            show: false
        }
    },
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default dialog
             * @type string
             * @desc 组件名称
             */
            cname: "dialog",
            radius: true,
            shadow: true,
            /**
             * @instance
             * @default
             * @type string
             * @desc 弹出层标题
             */
            title: '',
            /**
             * @instance
             * @default 取消
             * @type string
             * @desc 弹出层取消按钮文本
             */
            cancelText: '取 消',
            /**
             * @instance
             * @default 确认
             * @type string
             * @desc 弹出层确认按钮文本
             */
            submitText: '确 认',
            /**
             * @instance
             * @default null
             * @type function
             * @desc 取消按钮点击后的回调函数
             */
            onCancel: null,
            /**
             * @instance
             * @default null
             * @type function
             * @desc 确认按钮点击后的回调函数
             */
            onSubmit: null,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否隐藏弹出层标题
             */
            hideTitle: false,
            /**
             * @instance
             * @default null
             * @type string
             * @desc 是否显示弹出层按钮，按钮由两个关键字组成
             * @example
             * <RUI.Dialog buttons="submit,cancel" />
             * <RUI.Dialog buttons="submit" />
             */
            buttons: null,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否可拖拽
             * @example
             * <RUI.Dialog draggable={true} />
             */
            draggable:false
        };
    },
    /**
     * 显示弹出层
     * @instance
     */
    show: function () {
        this.setState({
            show: true
        });
    },
    /**
     * 隐藏弹出层
     * @instance
     */
    hide: function () {
        this.setState({
            show: false
        });
    },
    closeHandler: function () {
        this.hide();
        this.props.onCancel && this.props.onCancel.call();
    },
    submitHandler: function () {
        var result = undefined;
        if (this.props.onSubmit) {
            result = this.props.onSubmit.call(null, this);
        }

        if (typeof result != 'undefined') {
            if (result) {
                this.hide();
            }
        } else {
            this.hide();
        }
    },
    componentDidMount: function () {
        $(window).bind('resize', this.resize);
    },
    componentWillUnmount: function () {
        $(window).unbind('resize', this.resize);
    },
    componentDidUpdate: function (changes) {
        this.resize();
    },
    /**
     * 重新计算一次居中对齐（虽然自动调用了，但也许有时候你会发现没对齐，可以主动调一下这个方法）
     * @instance
     */
    resize: function () {
        var node = ReactDOM.findDOMNode(this);
        if (this.state.show) {
            var width = node.clientWidth;
            var height = node.clientHeight;
            //node.style.width = width + 'px';
            node.style.marginTop = -1 * (height / 2) + 'px';
            node.style.marginLeft = -1 * (width / 2) + 'px';
            node.style.top = "50%";
            node.style.left = "50%";

            clearTimeout(this._activeTimer);
            this._activeTimer = setTimeout(()=>className.addClass(node, 'rui-dialog-active'), 0);
        } else {
            node.style.width = 'auto';
            clearTimeout(this._activeTimer);
            className.removeClass(node, 'rui-dialog-active');
            this._activeTimer = setTimeout(()=>{node.style.top = "-200%"}, 300);
        }
    },
    _render:function() {
        var allname = className(this.props.className, this.getPropClass());
        var prefix = this.getDefaultClass();

        return <div className={allname}>
            <div className={prefix+"-content"}>
                {!this.props.hideTitle && (
                    <div className={prefix+"-header"}>
                        <h4 className={prefix+"-title"}>{this.props.title}</h4>
                        <Button className={prefix+"-close"} onClick={this.closeHandler}><Icon name="close" /></Button>
                    </div>
                )}
                <div className={prefix+"-body"}>
                    {this.props.children}
                </div>
                {this.props.buttons && (
                    <div className={prefix+"-footer"}>
                        {this.props.buttons.indexOf('cancel') >= 0 && (
                            <Button onClick={this.closeHandler}>{this.props.cancelText}</Button>)}
                        {this.props.buttons.indexOf('submit') >= 0 && (
                            <Button className="primary" onClick={this.submitHandler}>{this.props.submitText}</Button>)}
                    </div>
                )}
            </div>
        </div>;
    },
    render: function () {
        if(this.props.draggable) {
            return <Draggable handle=".rui-dialog-header">
                {this._render()}
            </Draggable>;
        }else {
            return this._render();
        }
    }
});

module.exports = Dialog;