/**
 * 表单行组件
 * @module containers/form/Control
 */

import ComponentBase from '../../mixins/ComponentBase.jsx';

import omit from '../../util/omit.jsx';
import className from '../../util/className.jsx';

var Label = React.createClass({
    render:function() {
        return <label className={"rui-form-label"}>{this.props.children}</label>;
    }
});

var Content = React.createClass({
    render:function() {
        return <div className={"rui-form-content"}>{this.props.children}</div>
    }
});

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
            contentClassName: "",
            labelClassName: "",
            contentStyle: {},
            labelStyle: {}
        };
    },
    /**
     * 获取当前表单行的值
     * @instance
     * @returns {*|null}
     */
    getValue:function() {
        return this.refs.content.getValue && (this.refs.content.getValue() || null);
    },
    render:function() {
        var ControlMap = Control.findControlMap(this.props.type, this.props);

        var props = omit(this.props, 'cname');

        return <div {...this.props} className={"clearfix " + className(this.props.className, this.getPropClass())}>
            <Label className={this.props.labelClassName} style={this.props.labelStyle}>{this.props.label}</Label>
            <Content className={this.props.contentClassName} style={this.props.contentStyle}>
                <ControlMap.tag {...props} {...ControlMap.props} ref="content">
                    {this.props.children}
                </ControlMap.tag>
            </Content>
        </div>;
    }
});

Control.findControlMap = function(type, props) {
    var result = null;

    type = type || 'input';
    
    if(type == 'password') {
        result = {
            tag:'Input',
            props:{
                type:'password'
            }
        };
    }
    if(type == 'checkbox') {
        result = {
            tag:'CheckboxGroup'
        };
    }
    if(type == 'radio') {
        result = {
            tag:'RadioGroup'
        };
    }

    if(!result) {
        result = {
            tag:type.substring(0, 1).toUpperCase() + type.substring(1)
        };
    }

    result.tag = RUI[result.tag];
    result.props = Object.assign(result.props || {}, omit(props, 'type', 'cname', 'label'));

    return result;
};

module.exports = Control;