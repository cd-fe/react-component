import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/spinner.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'spinner'
        };
    },
    getInitialState:function() {
        return {
            value:0
        };
    },
    getValue:function() {
        return this.state.value;
    },
    changeHandler:function(e) {

    },
    componentWillReceiveProps:function(nextProps) {
        var update = {};
        if(typeof nextProps.value != 'undefined' && nextProps.value != this.state.value) {
            update.value = nextProps.value;
        }
        this.setState(update);
    },
    render:function() {
        var props = omit(this.props, 'onChange', 'value', 'readonly');
        return <div {...props} className={className(this.props.className, this.getPropClass())}>

        </div>;
    }
});