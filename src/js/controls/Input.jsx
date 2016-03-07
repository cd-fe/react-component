import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/input.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'input',
            mode:'dynamic',
            type:'text'
        };
    },
    getInitialState:function() {
        return {
            value:this.props.value || "",
            change:this.props.onChange
        }
    },
    changeHandler:function(e) {
        if(this.props.mode == 'dynamic') {
            this.setState({
                value: e.target.value
            });

            this.state.change && this.state.change.call(null, e);
        }
    },
    componentWillReceiveProps:function(nextProps) {
        var update = {};
        if(nextProps.value != this.state.value) {
            update.value = nextProps.value
        };

        this.setState(update);
    },
    render:function() {
        var props = omit(this.props, 'onChange', 'value', 'readonly');
        return <input {...props}
            type={this.props.type}
            value={this.state.value}
            onChange={this.changeHandler}
            className={className(this.props.className, this.getPropClass())}
        ></input>
    }
});