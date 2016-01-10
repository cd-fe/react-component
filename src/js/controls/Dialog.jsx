/**
 * Created by rikohan on 16-1-10.
 */
import className from '../util/className.jsx';
import PropClassMixin from '../mixins/PropClassMixin.jsx';
import EventDispatcher from '../mixins/EventDispatcher.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import OverlayMixin from '../mixins/OverlayMixin.jsx';

import Button from './Button.jsx';

import '../../css/dialog.scss';

var Dialog = React.createClass({
    mixins:[PropClassMixin, EventDispatcher, ComponentBase, OverlayMixin],
    getInitialState:function() {
        return {
            show:false,
            title:this.props.title || '',
            cancelText:this.props.cancelText || '取消',
            submitText:this.props.submitText || '确认'
        }
    },
    getDefaultProps:function() {
        return {
            cname:"dialog",
            radius:true,
            shadow:true
        };
    },
    show:function() {
        this.setState({
            show:true
        });
    },
    hide:function() {
        this.setState({
            show:false
        });
    },
    closeHandler:function() {
        this.hide();
        this.props.onCancel && this.props.onCancel.call();
    },
    submitHandler:function() {
        var result = undefined;
        if(this.props.onSubmit) {
            result = this.props.onSubmit.call(null, this);
        }

        if(typeof result != 'undefined') {
            if(result) {
                this.hide();
            }
        }else {
            this.hide();
        }
    },
    componentDidMount:function() {
        window.addEventListener('resize', this.resize.bind(this));
    },
    componentWillReceiveProps:function(nextProps) {
        this.setState({
            title:nextProps.title || '',
            cancelText:nextProps.cancelText || '取消',
            submitText:nextProps.submitText || '确认'
        });
    },
    componentDidUpdate:function(changes) {
        this.resize();
    },
    resize:function() {
        var node = ReactDOM.findDOMNode(this);

        if(node.style.display == 'block') {
            var width = node.clientWidth;
            var height = node.clientHeight;
            node.style.width = width + 'px';
            node.style.height = height + 'px';
            node.style.marginTop = -1 * (height / 2) + 'px';
            node.style.marginLeft = -1 * (width / 2) + 'px';
        }
    },
    render:function() {
        var allname = className(this.props.className, this.getPropClass());
        var prefix = this.getDefaultClass();
        return <div className={allname} style={{display:this.state.show ? 'block' : 'none'}}>
            <div className={prefix+"-content"}>
                {!this.props.hideTitle && (
                    <div className={prefix+"-header"}>
                        <button type="button" className="close" onClick={this.closeHandler}>×</button>
                        <h4 className={prefix+"-title"}>{this.state.title}</h4>
                    </div>
                )}
                <div className={prefix+"-body"}>
                    {this.props.children}
                </div>
                {this.props.buttons && (
                    <div className={prefix+"-footer"}>
                        {this.props.buttons.indexOf('cancel') >= 0 && (<Button onClick={this.closeHandler}>{this.state.cancelText}</Button>)}
                        {this.props.buttons.indexOf('submit') >= 0 && (<Button className="primary" onClick={this.submitHandler}>{this.state.submitText}</Button>)}
                    </div>
                )}
            </div>
        </div>;
    }
});

module.exports = Dialog;