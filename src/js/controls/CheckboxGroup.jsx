import className from '../util/className.jsx';
import empty from '../util/empty.jsx';
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
        if(this.props.children) {
            this.props.children = this.props.children.map(function(child, index) {
                if(child.props && !empty(child.props)) {
                    if(child.props.onChange) {
                        child.props.onChange = [child.props.onChange, this.childrenChangeHandler.bind(this, index)];
                    }else {
                        child.props.onChange = this.childrenChangeHandler.bind(this, index);
                    }
                }else {
                    child.props = {
                        onChange:this.childrenChangeHandler.bind(this, index)
                    };
                }

                this.groupValues[index] = typeof child.props.value != 'undefined' ? ( child.props.value ? 1 : 0) : 0;
                return child;
            }.bind(this));
        }

        var classes = className(this.props.className, this.getPropClass());
        return <div className={classes}>{this.props.children}</div>
    }
});