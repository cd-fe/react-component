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
import Row from './form/Row.jsx';
import Control from './form/Control.jsx';
import Reset from './form/Reset.jsx';
import Submit from './form/Submit.jsx';
import Check from './form/Check.jsx';
import CF from './form/CommonFunc.jsx';
import '../../css/form/form.scss';

var Form = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
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
    getInitialState : function() {
        return {
            controls : []
        }
    },
    //获取所有 control 实例
    register:function(control,type) {
        var controls = this.state.controls;
        if(type == 'add') {
            this.state.controls.push(control);
        }else if(type == 'del') {
            this.state.controls = controls.filter(function(item, index) {
                return control.props.name != item.props.name
            });
        }
        this.setState({});
    },
    getControl : function(str) {
        var exits;
        if(str) {
            exits = this.state.controls.findIndex(function(item, index) {
                return item.props.name == str
            });
        }else {
            return this.state.controls;
        }
        return exits > -1 ?  this.state.controls[exits] : null
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
        return control ? CF.getSingleFieldRules(control) : control
    },
    getAllFieldValues : function() {
        var array = [];
        this.state.controls.forEach(function(item, index) {
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
    validateSingleField : function(str) {
        var control = null;
        var result = null;
        var rules = null;
        if(str) {
            control = this.getControl(str);
        }
        if(control) {
            rules = CF.getSingleFieldRules(control);
            if(rules) {
                result = Check(control,control.getValue()) && rules.callback && rules.callback(control,control.getValue());
            }else {
                result = true;
            }
        }
        return result;
    },
    validateAllFields : function() {
        var pass,callback,result,value,rules,remote;
        this.fields = [];//清空
        this.state.controls.forEach(function(item, index) {
            value = item && item.getValue && item.getValue();
            rules = CF.getSingleFieldRules(item);
            if(rules) {
                callback = rules.callback;
                result = callback ? (Check(item,value) && callback(item,value)) : Check(item,value);
                this.fields.push({
                    name:item.props.name,
                    value:value,
                    checkStatus:result//true false
                });
            }else {
                this.fields.push({
                    name:item.props.name,
                    value:value,
                    checkStatus:true
                });
            }

        }.bind(this));
        pass = this.fields.every(function(item, index) {
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
    /**
     * 提交表单，该方法会触发 props.onSubmit 回调
     * @instance
     */
    submit:function(e) {
        var result = this.validateAllFields();
        if(result) {
            //var form = ReactDOM.findDOMNode(this);
            this.props.onSubmit(result, this);
        }else {
            e && e.nativeEvent.preventDefault();
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
    componentWillUnmount : function() {
        //必须清除
        this.setState({
            controls : []
        });
        //this.state.controls.length = 0
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        return <form {...this.props} className={classes}>
            {this.props.children}
        </form>;
    }
});
Form.Row = Row;
Form.Control = Control;
Form.Submit = Submit;
Form.Reset = Reset;

module.exports = Form;
