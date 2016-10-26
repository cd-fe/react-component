/**
 * 表单元组件
 * @module containers/form/Control
 */

import ComponentBase from '../../mixins/ComponentBase.jsx';

import omit from '../../util/omit.jsx';
import className from '../../util/className.jsx';

import Check from './Check.jsx';
import Pubsub from './Pubsub.jsx';

/*var Label = React.createClass({
    render:function() {
        return <label className={"rui-form-label"}>{this.props.children}</label>;
    }
});*/

/*
var Content = React.createClass({
    render:function() {
        return <div className={"rui-form-content is-validating has-feedback"}>{this.props.children}</div>
    }
});
*/

var Control = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
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
             * @default input
             * @type string
             * @desc 表单行内的表单输入类型，可选值有 input, password, checkbox, radio 等
             */
            type: 'input',
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
        this.props.required && Pubsub.subscribe('Check_UID_' + this.props.mark, function (key, value) {
            Check(value[0], this);
        }.bind(this));

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

        var props = omit(this.props, 'cname');

        var cls;

        if(this.state.validateStatus) {
            cls = "rui-form-content " + (this.state.validateStatus)
        }else {
            cls = "rui-form-content";
        }
        if(this.props.type == 'input' || this.props.type == 'password') {
            cls = cls + ' has-feedback'
        }

        return <div {...this.props} className={className(this.props.className, this.getPropClass())}>
                    <label className={"rui-form-label"}>{this.props.required ?  (<i className="required">*</i>) : null}{this.props.label}</label>
                    {this.props.desc && this.props.desc.ldesc}
                    <div className={className(cls,this.props.wcname)}>
                        <span className="input-wrapper">
                            <ControlMap.tag {...props} {...ControlMap.props} ref="content">
                                {this.props.children}
                            </ControlMap.tag>
                        </span>
                        {
                           this.buildMsg()
                        }
                    </div>
                    {this.props.desc && this.props.desc.rdesc}
                </div>;
    }
});

Control.findControlMap = function(rc) {
    var result = null;

    var type = rc.props.type || 'input';
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

    if(!result) {
        result = {
            tag:type.substring(0, 1).toUpperCase() + type.substring(1)
        };
    }
    //绑定事件
    rc.props.trigger && rc.props.trigger.split('|').forEach(function(evt) {

        result.props[evt] = function(e) {
            window.setTimeout(function() {
                var value = rc.getValue() || '';
                Check(value, rc);
            },0);
        };

    });

    result.tag = RUI[result.tag];
    result.props = result.props || {};

    return result;
};

module.exports = Control;
