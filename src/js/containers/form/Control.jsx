/**
 * 表单元组件
 * @module containers/form/Control
 */

import ComponentBase from '../../mixins/ComponentBase.jsx';

import omit from '../../util/omit.jsx';
import className from '../../util/className.jsx';

import Check from './Check.jsx';
import CF from './CommonFunc.jsx';

var Control = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
    contextTypes:{
        form:React.PropTypes.object
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
        if(this.context.form) {
            this.context.form.register(this, 'add');
        }
    },
    componentWillUnmount : function() {
        if(this.context.form) {
            this.context.form.register(this, 'del');
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
        console.log(this.props.type);
        var ControlMap = Control.findControlMap(this);

        var filters = CF.filterArray( Object.keys(this.props),Object.keys(ControlMap.props)).filter(function(item, index){
            return /^on.+/.test(item)
         });

        filters = filters.concat(['cname','className']);

        var props = omit(this.props, filters);

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
Control.MakeControlByType = function(type) {
    var result = null;
    switch(type) {
        case 'input':
        case 'upload':
            result = {
                tag:type.substring(0, 1).toUpperCase() + type.substring(1),
                props:{
                    type:'type'
                }
            };
            break;
        case 'password':
            result = {
                tag:'Input',
                props:{
                    type:'password'
                }
            };
            break;
        case 'checkbox':
            result = {
                tag:'CheckboxGroup',
                props:{
                    type:'CheckboxGroup'
                }
            };
            break;
        case 'radio':
            result = {
                tag:'RadioGroup',
                props:{
                    type:'RadioGroup'
                }
            };
            break;
    }
    return result
};
Control.findControlMap = function(rc) {
    var props = rc.props;
    if(!props.type) {
        return;
    }
    var type = rc.props.type;
    var result = this.MakeControlByType(type);
    if(!result) {
        result = {
            tag:type.substring(0, 1).toUpperCase() + type.substring(1)
        };
    }
    var rules = CF.getSingleFieldRules(rc);

    result.tag = RUI[result.tag];
    result.props = Object.assign(result.props || {}, omit(props, 'type', 'cname', 'label','className')  );

    rules && rules.trigger && rules.trigger.split('|').forEach(function(evt) {
        result.props[evt] = function(e) {
           window.setTimeout(function() {
               var value = rc.getValue();
               Check(rc, value) && rules.callback && rules.callback(rc,value);
           },0);
        };
    });
    return result;
};

module.exports = Control;
