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
import Pubsub from './form/Pubsub.jsx';
import Row from './form/Row.jsx';
import Control from './form/Control.jsx';
import Reset from './form/Reset.jsx';
import Submit from './form/Submit.jsx';
import Check from './form/Check.jsx';
import '../../css/form/form.scss';

var Form = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
    controls:[],
    childContextTypes: {
        form:React.PropTypes.object
    },
    getChildContext:function() {
        return {
            form:this
        };
    },
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
    serializeObject:function(array) {
        var data = {};
        array.forEach(function(item) {
            data[item.name] = item.value;
        });
        return data;
    },
    serializeArray:function() {
        var array = [];
        this.controls.forEach(function(item, index) {
            var value = item && item.getValue && item.getValue();
            //TODO 验证数据

            var result = Check(item.getValue(),item,item.props.rule) && item.props.rule.callback(item);

            if(item.toString() == '[object Object]') {
                array.push({
                    name:item.props.name,
                    value:value,
                    result:result

                });
            }
        }.bind(this));

        //filter 得到所有表单control
        array = array.filter(function(item, index) {
            return typeof item.name !== 'undefined'
        });


        //获取必选项
        var isValid = array.every(function(item, index) {
                            return !!item.result
                        });
        if(isValid) {
            array = this.serializeObject(array);
        }
        return isValid ? array : isValid;
    },
    register:function(control) {
        this.controls.push(control);
    },
    submitHandler:function(e) {
        var result = this.serializeArray();
        if(result) {
            console.dir(result);
        }else {
            e && e.nativeEvent.preventDefault();
            return false;
        }
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
                    form : this,
                    ref:'Row_' + index,
                    rule : this.props.rules,
                    index:index
                }, child.props);
                return React.cloneElement(child, props);
            }.bind(this))}
        </form>;
    }
});
Form.Row = Row;
Form.Control = Control;
Form.Submit = Submit;
Form.Reset = Reset;

module.exports = Form;
