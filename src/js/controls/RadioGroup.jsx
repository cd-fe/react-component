import className from '../util/className.jsx';
import empty from '../util/empty.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            value:(function() {
                if(typeof this.props.value == 'undefined') {
                    var children = this.props.children ? (this.props.children instanceof Array ? this.props.children : [this.props.children]) : [];
                    var some = children.find(function(item) {
                        if(item.props) {
                            return item.props.cname == 'radio';
                        }
                        return false;
                    });
                    if(some) {
                        return some.props.value;
                    }
                    return '';
                }else {
                    return this.props.value;
                }
            }.bind(this))()
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
    childrenChangeHandler:function(index, event) {
        this.setState({
            value:event.data.value
        });
        this.dispatchEvent('change', this.getValue());

        var node = ReactDOM.findDOMNode(this);

    },
    render:function() {
        var children = null;
        if(this.props.children) {
            children = this.props.children.map(function(child, index) {
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

                if(this.state.value == child.props.value) {
                    child.props.selected = true;
                }else {
                    child.props.selected = false;
                }

                return child;
            }.bind(this));
        }
        var classes = className(this.props.className, this.getPropClass());
        return <div className={classes}>{children}</div>
    }
});