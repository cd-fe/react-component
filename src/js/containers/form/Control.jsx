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
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'control'
        };
    },
    render:function() {
        var ControlMap = Control.findControlMap(this.props.type);

        var props = omit(this.props, 'cname');

        return <div {...this.props} className={className(this.props.className, this.getPropClass())}>
            <Label>{this.props.label}</Label>
            <Content>
                <ControlMap.tag {...props} {...ControlMap.props}>
                    {this.props.children}
                </ControlMap.tag>
            </Content>
        </div>;
    }
});

Control.findControlMap = function(type) {
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
    result.props = result.props || {};

    return result;
};

module.exports = Control;