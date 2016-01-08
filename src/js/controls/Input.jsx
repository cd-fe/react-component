import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import PropClassMixin from '../mixins/PropClassMixin.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import EventDispatcher from '../mixins/EventDispatcher.jsx';

module.exports = React.createClass({
    mixins:[PropClassMixin, EventDispatcher, ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'input'
        };
    },
    getInitialState:function() {
        return {
            value:this.props.value || "",
            change:this.props.onChange
        }
    },
    changeHandler:function(e) {
        this.setState({
            value:e.target.value
        });

        this.state.change && this.state.change.call(null, e);
    },
    componentWillReceiveProps:function(props) {
        this.setState({
            value:props.value,
            change:props.onChange
        });
    },
    render:function() {
        var props = omit(this.props, 'type', 'onChange', 'value');
        return <input {...props} type="text" value={this.state.value} onChange={this.changeHandler} className={className(this.props.className, this.getPropClass())}></input>
    }
});