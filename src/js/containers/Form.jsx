/**
 * 表单组件
 * @module containers/Form
 *
 * @see 表单行元素 {@link module:containers/form/Control}
 * @see 重置表单按钮 {@link module:containers/form/Reset}
 * @see 提交表单按钮 {@link module:containers/form/Submit}
 */

import ComponentBase from '../mixins/ComponentBase.jsx';
import className from '../util/className.jsx';
import Control from './form/Control.jsx';
import Reset from './form/Reset.jsx';
import Submit from './form/Submit.jsx';

import '../../css/form.scss';

var Form = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            /**
             * @instance
             * @default form
             * @type string
             * @desc 组件名称
             */
            cname:'form',
            /**
             * @member
             * @instance
             * @type function
             * @default function() {return true;}
             * @desc 表单提交时的回调函数，该函数返回true时允许提交，否则不提交
             */
            onSubmit:function() {
                return true;
            }
        };
    },
    serializeArray:function() {
        var list = Object.keys(this.refs || []).map(function(ref) {
            return this.refs[ref];
        }.bind(this));

        var array = [];
        list.forEach(function(item) {
            var result = item && item.getValue && item.getValue();
            if(result) {
                array.push({
                    name:item.props.name,
                    value:result
                });
            }
        });

        return array;
    },
    serializeObject:function() {
        var array = this.serializeArray();
        var data = {};
        array.forEach(function(item) {
            data[item.name] = item.value;
        });
        return data;
    },
    submitHandler:function(e) {
        var result = this.props.onSubmit(this.serializeObject(), this);
        if(result === false) {
            e && e.nativeEvent.preventDefault();
        }
        return result;
    },
    /**
     * 提交表单，该方法会触发 props.onSubmit 回调
     * @instance
     */
    submit:function() {
        var result = this.submitHandler();
        if(result !== false) {
            var form = ReactDOM.findDOMNode(this);
            form.submit();
        }
    },
    /**
     * 重置表单
     * @instance
     */
    reset:function() {
        var form = ReactDOM.findDOMNode(this);
        form.reset();
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        return <form {...this.props} className={classes} onSubmit={this.submitHandler}>
            {React.Children.map(this.props.children, function(child, index) {
                var props = Object.assign({
                    form:this,
                    ref:'control' + index
                }, child.props);

                return React.cloneElement(child, props);
            }.bind(this))}
        </form>;
    }
});

Form.Control = Control;
Form.Submit = Submit;
Form.Reset = Reset;

module.exports = Form;