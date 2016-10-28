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
    fields : [],
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
    //获取所有 control 实例
    register:function(control) {
        this.controls.push(control);
    },
    getControl : function(str) {
        var exits;
        if(str) {
            exits = this.controls.findIndex(function(item, index) {
                return item.props.name == str
            });
        }
        return exits > -1 ?  this.controls[exits] : null
    },
    getSingleFieldValue : function(str) {
        let control = null;
        if(str) {
            control = this.getControl(str);
        }
        return control ? control.getValue() : control;
    },
    getSingleFieldRule : function(str) {
        let control = null;
        if(str) {
            control = this.getControl(str);
        }
        return control ? control.props.rule : control
    },
    getAllFieldValues : function() {
        var array = [];
        this.controls.forEach(function(item, index) {
            var value = item && item.getValue && item.getValue();
            array.push({
                name:item.props.name,
                value:value
            });
        }.bind(this));
        return array;
    },
    getAllFieldsInfo : function(str) {
        return this.fields.length == 0 ? this.getAllFieldValues() : this.fields;
    },
    setFieldCheckStatus : function(str, status) {
        var control = this.getControl(str);
        control && control.setState({
            validateStatus : status.validateStatus,
            explain : status.explain
        });
    },
    validate : function() {
        let pass;
        this.fields = [];//清空
        this.controls.forEach(function(item, index) {
            var value = item && item.getValue && item.getValue();
            //TODO 验证数据
            var result = Check(item) && item.context.rule.validator[item.props.name].rules.callback(item);

            this.fields.push({
                name:item.props.name,
                value:value,
                checkStatus:result//true false
            });
        }.bind(this));
        pass = this.fields.some(function(item, index) {
            return item.checkStatus
        });
        return !pass ? pass : this.getAllFieldsInfo();
    },
    serializeObject:function(array) {
        var data = {};
        array.forEach(function(item) {
            data[item.name] = item.value;
        });
        return data;
    },
    submitHandler:function(e) {
        let result = this.validate();
        if(result) {
            result = this.serializeObject(result);
            console.log('输出结果');
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
            console.log('数据正常，可以提交');
            //form.submit();
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
                    ref:'Row_' + index,
                    rule : this.props.rules,
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
