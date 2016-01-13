import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Input from './Input.jsx';
import '../../css/datepicker.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            popup:false
        };
    },
    getDefaultProps:function() {
        return {
            cname:'datepicker'
        };
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        if(this.state.popup) {
            classes += ' active';
        }

        var props = omit(this.props, 'value', 'className');

        return <div className={classes}>
            <Input value={this.props.value || ""} {...props} />
        </div>
    }
});