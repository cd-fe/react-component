import className from '../util/className.jsx';
import empty from '../util/empty.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            value:this.props.value
        };
    },
    getDefaultProps:function() {
        return {
            cname:'radiogroup'
        };
    },
    getValue:function() {
        return this.state.value;
    },
    groupValidate:function(event, target) {
        if(target.props.value == this.state.value) {
            return false;
        }else {
            this.setState({
                value:target.props.value
            });

            this.dispatchEvent('change', this.getValue());
        }
    },
    render:function() {
        var children = null;
        if(this.props.children) {
            children = this.props.children.map(function(child, index) {
                if(this.state.value == child.props.value) {
                    child.props.selected = true;
                }else {
                    child.props.selected = false;
                }
                child.props.groupValidate = this.groupValidate;

                return React.cloneElement(child);
            }.bind(this));
        }
        var classes = className(this.props.className, this.getPropClass());
        return <div className={classes}>{children}</div>
    }
});