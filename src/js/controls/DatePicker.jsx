import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Input from './Input.jsx';
import Calendar from './datepicker/Calendar.jsx';

import DateFormatter from '../formatters/DateFormatter.jsx';

import '../../css/datepicker.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            popup:false,
            value:this.props.value
        };
    },
    getDefaultProps:function() {
        return {
            cname:'datepicker'
        };
    },
    componentDidUpdate:function() {
        document.body.removeEventListener('mousedown', this.hidePopup);
        if(this.state.popup) {
            document.body.addEventListener('mousedown', this.hidePopup);
        }
    },
    componentWillReceiveProps:function(newProps) {
        if(newProps.value) {
            this.setState({
                value:newProps.value
            });
        }
    },
    togglePopup:function() {
        this.setState({
            popup:!this.state.popup
        });
    },
    hidePopup:function(e) {
        var target = e.target;
        var sameParent = false;
        var parent = ReactDOM.findDOMNode(this);

        while(target) {
            if(target === parent) {
                sameParent = true;
                break;
            }
            target = target.parentNode;
        }

        if(!sameParent) {
            this.setState({
                popup: false
            });
        }
    },
    onCalendarChange:function(event) {
        if(this.props.range) {
            this.setState({
                value: event.data
            });
        }else {
            this.setState({
                value: event.data,
                popup: false
            });
        }
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

        var props = omit(this.props, 'value', 'className', 'cname');

        if(!props.formatter) {
            props.formatter = new DateFormatter('Y-m-d');
        }

        return <div className={classes}>
            <Input mode="static" value={props.formatter.format(this.state.value)} className={defaultClass+"-input-icon"} onClick={this.togglePopup}/>
            <div className={defaultClass+'-popup'}>
                <div className={defaultClass+'-popup-arrow'} />
                {this.props.range && (<div className={defaultClass+'-row'}>

                </div>)}
                <div className={defaultClass+'-row'}>
                    {this.props.range ? (
                        <div>
                            <Calendar value={this.state.value} />
                            <Calendar value={this.state.value} />
                        </div>
                    ) : (
                        <Calendar value={this.state.value} onChange={this.onCalendarChange} />
                    )}
                </div>
            </div>
        </div>
    }
});