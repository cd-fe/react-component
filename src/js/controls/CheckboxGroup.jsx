import className from '../util/className.jsx';
import empty from '../util/empty.jsx';
import clone from '../util/clone.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';

module.exports = React.createClass({
    mixins:[ComponentBase],
    groupValues:[],
    getDefaultProps:function() {
        return {
            cname:'checkboxgroup'
        };
    },
    getValue:function() {
        return this.groupValues;
    },
    childrenChangeHandler:function(index, event) {
        this.groupValues[index] = event.data;
        this.dispatchEvent('change', this.getValue());
    },
    render:function() {
        var children = [];
        if(this.props.children) {
            children = this.props.children.map(function(child, index) {
                var props = clone(child.props);
                if(props && !empty(props)) {
                    if(props.onChange) {
                        props.onChange = [props.onChange, this.childrenChangeHandler.bind(this, index)];
                    }else {
                        props.onChange = this.childrenChangeHandler.bind(this, index);
                    }
                }else {
                    props = {
                        onChange:this.childrenChangeHandler.bind(this, index)
                    };
                }

                this.groupValues[index] = {value:props.value || "", selected:props.selected ? 1 : 0};

                props.key = index;
                return React.cloneElement(child, props);
            }.bind(this));
        }

        var classes = className(this.props.className, this.getPropClass());
        return <div className={classes}>{children}</div>
    }
});