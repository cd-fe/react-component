/**
 * 表单元组件
 * @module containers/form/Control
 */

import ComponentBase from '../../mixins/ComponentBase.jsx';

import omit from '../../util/omit.jsx';
import className from '../../util/className.jsx';

import Check from './Check.jsx';
import CF from './commonFunc.jsx';

var Control = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
    contextTypes:{
        form:React.PropTypes.object,
        rule:React.PropTypes.object
    },
    getDefaultProps:function() {
        return {
            /**
             * @instance
             * @default control
             * @type string
             * @desc 组件名称
             */
            cname:'control',
            /**
             * @instance
             * @default null
             * @type string
             * @desc 表单行内的表单输入类型，可选值有 input, password, checkbox, radio 等
             */
            type: null,
            /**
             * @instance
             * @type string
             * @desc 表单行组件显示的文本内容
             */
            label: null,
            /**
             * @instance
             * @type string
             * @desc 验证状态，可选值有is-success, is-error, is-warning, is-validating
             */
            validateStatus : '',
            /**
             * @instance
             * @type string
             * @desc 表单组件验证描述
             */
            explain : ''

        };
    },
    getInitialState : function() {
        return {
            validateStatus : this.props.validateStatus,
            explain : this.props.explain
        }
    },
    /**
     * 获取当前表单行的值
     * @instance
     * @returns {*|null}
     */
    getValue:function() {
        return this.refs.content.getValue && (this.refs.content.getValue() || null);
    },
    componentDidMount : function() {
        //TODO 验证顺序不一致，待优化
        if(this.context.form) {
            this.context.form.register(this);
        }
    },
    buildMsg : function() {
        var status = this.state.validateStatus;
        var type = this.props.type;
        var html = null;

        switch(status) {
            case 'is-warning' :
                html = <div className="form-explain">{this.state.explain}</div>;
                break;
            case 'is-error' :
                html = <div className="form-explain">{this.state.explain}</div>;
                break;
            case 'is-validating' :
                break;
            case 'is-success' :
                break;
        }
        return html;
    },
    render:function() {
        var ControlMap = Control.findControlMap(this);

        var props = omit(this.props, 'cname','onChange');
        //if(!ControlMap && this.props.children instanceof Array) {
        //    throw new Error('custom Form.Control have to own single child.');
        //}
        var cls;
        if(this.state.validateStatus) {
            cls = "rui-form-unit " + (this.state.validateStatus)
        }else {
            cls = "rui-form-unit";
        }
        if(this.props.type == 'input' || this.props.type == 'password') {
            cls = cls + ' has-feedback'
        }

        return <div {...this.props} className={className(this.props.className, this.getPropClass()) + " " + cls}>
            <span className="input-wrapper">
                {ControlMap ? (<ControlMap.tag    {...ControlMap.props} {...props}  ref="content">
                    {this.props.children}
                </ControlMap.tag>) : (
                    React.Children.map(this.props.children, function(child, index) {
                        if(child.props && typeof child.props.name != 'undefined') {
                            return React.cloneElement(child, Object.assign({
                                ref:"content"
                            }, child.props));
                        }
                        return null;
                    })
                )}
            </span>
            {
               this.buildMsg()
            }
        </div>;
    }
});
Control.findControlMap = function(rc) {
    var result = null;
    var props = rc.props;
    if(!props.type) {
        return;
    }

    var type = rc.props.type;
    if(type == 'input') {
        result = {
            tag:'Input',
            props:{
                type:'input',
            }
        };
    }
    if(type == 'password') {
        result = {
            tag:'Input',
            props:{
                type:'password',
            }
        };
    }
    if(type == 'checkbox') {
        result = {
            tag:'CheckboxGroup',
            props:{
                type:'CheckboxGroup',
            }
        };
    }
    if(type == 'radio') {
        result = {
            tag:'RadioGroup',
            props:{
                type:'RadioGroup',
            }
        };
    }

    if(type == 'upload') {
        result = {
            tag:'Upload',
            props:{
                type:'Upload',
            }
        };
    }

    if(type == 'select') {
        result = {
            tag:'Select',
            props:{
                type:'Select',
            }
        };
    }

    if(type == 'datePicker') {
        result = {
            tag:'DatePicker',
            props:{
                type:'DatePicker',
            }
        };
    }
    if(type == 'textarea') {
        result = {
            tag:'Textarea',
            props:{
                type:'Textarea',
            }
        };
    }
    if(!result) {
        result = {
            tag:type.substring(0, 1).toUpperCase() + type.substring(1)
        };
    }

    //绑定事件
    var rules = rc.context.rule.validator[rc.props.name].rules;

    result.tag = RUI[result.tag];
    result.props = Object.assign(result.props || {}, omit(props, 'type', 'cname', 'label'));
    //TODO 后续完善
    rules.trigger && rules.trigger.split('|').forEach(function(evt) {
        result.props[evt] = function(e) {
            window.setTimeout(function() {
                Check(rc) && rules.callback && rules.callback(rc);
            }, 0);
            console.log('系统定义');
        };
    });
    return result;
};

module.exports = Control;
