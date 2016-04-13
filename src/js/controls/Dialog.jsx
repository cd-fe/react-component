/**
 * 弹出层组件
 * @module controls/Dialog
 */
import className from '../util/className.jsx';
import OverlayMixin from '../mixins/OverlayMixin.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Button from './Button.jsx';

import '../../css/dialog.scss';

var Dialog = React.createClass({
    mixins: [ComponentBase, OverlayMixin],
    getInitialState: function () {
        return {
            show: false,
            title: this.props.title || '',
            cancelText: this.props.cancelText || '取消',
            submitText: this.props.submitText || '确认'
        }
    },
    getDefaultProps: function () {
        return {
            cname: "dialog",
            radius: true,
            shadow: true
        };
    },
    show: function () {
        this.setState({
            show: true
        });
    },
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
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            title: nextProps.title || '',
            cancelText: nextProps.cancelText || '取消',
            submitText: nextProps.submitText || '确认'
        });
    },
    componentWillUnmount: function () {
        $(window).unbind('resize', this.resize);
    },
    componentDidUpdate: function (changes) {
        this.resize();
    },
    resize: function () {
        var node = ReactDOM.findDOMNode(this);

        if (node.style.display == 'block') {
            var width = node.clientWidth;
            var height = node.clientHeight;
            node.style.width = width + 'px';
            node.style.marginTop = -1 * (height / 2) + 'px';
            node.style.marginLeft = -1 * (width / 2) + 'px';
        } else {
            node.style.width = 'auto';
        }
    },
    render: function () {
        var allname = className(this.props.className, this.getPropClass());
        var prefix = this.getDefaultClass();
        return <div className={allname} style={{display:this.state.show ? 'block' : 'none'}}>
            <div className={prefix+"-content"}>
                {!this.props.hideTitle && (
                    <div className={prefix+"-header"}>
                        <h4 className={prefix+"-title"}>{this.state.title}</h4>
                        <Button className={prefix+"-close"} onClick={this.closeHandler}>×</Button>
                    </div>
                )}
                <div className={prefix+"-body"}>
                    {this.props.children}
                </div>
                {this.props.buttons && (
                    <div className={prefix+"-footer"}>
                        {this.props.buttons.indexOf('cancel') >= 0 && (
                            <Button onClick={this.closeHandler}>{this.state.cancelText}</Button>)}
                        {this.props.buttons.indexOf('submit') >= 0 && (
                            <Button className="primary" onClick={this.submitHandler}>{this.state.submitText}</Button>)}
                    </div>
                )}
            </div>
        </div>;
    }
});

module.exports = Dialog;