import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Input from './Input.jsx';
import Calendar from './datepicker/Calendar.jsx';

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
        var defaultClass = this.getDefaultClass();
        var classes = className(this.props.className, this.getPropClass());
        if(this.state.popup) {
            classes += ' active';
        }
        if(this.props.range) {
            classes += ' range';
        }

        var props = omit(this.props, 'value', 'className');

        return <div className={classes}>
            <Input className={defaultClass+"-inputer"} value={this.props.value || ""} {...props} />
            <div className={defaultClass+'-popup'}>
                {this.props.range && (<div className={defaultClass+'-row'}>

                </div>)}
                <div className={defaultClass+'-row'}>

                </div>
            </div>
        </div>
    }
});