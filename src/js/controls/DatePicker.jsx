import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Input from './Input.jsx';
import Calendar from './datepicker/Calendar.jsx';
import Button from './Button.jsx';

import DateFormatter from '../formatters/DateFormatter.jsx';

import '../../css/datepicker.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            popup:false,
            value:this.props.value,
            startValue:this.props.startValue || this.props.value,
            endValue:this.props.endValue || this.props.value + 86400 * 1000,
            startValuePreview:this.props.startValue || this.props.value,
            endValuePreview:this.props.endValue || this.props.value + 86400 * 1000
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
    startCalendarChange:function(event) {
        this.setState({
            startValuePreview:event.data
        });
    },
    endCalendarChange:function(event) {
        this.setState({
            endValuePreview:event.data
        });
    },
    rangeCalendarCancel:function() {
        this.setState({
            popup:false
        });
    },
    rangeCalendarSave:function() {
        this.setState({
            startValue:this.state.startValuePreview,
            endValue:this.state.endValuePreview,
            popup:false
        });
    },
    display:function(type) {
        var formatter = (this.props.formatter || new DateFormatter("Y-m-d"));
        if(type) {
            if(type == 'start') {
                return formatter.format(this.state.startValuePreview);
            }
            if(type == 'end') {
                return formatter.format(this.state.endValuePreview);
            }
        }
        else if(this.props.range) {
            return formatter.format(this.state.startValue) + '  -  ' + formatter.format(this.state.endValue);
        }else {
            return formatter.format(this.state.value);
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

        return <div className={classes}>
            <Input mode="static" value={this.display()} className={defaultClass+"-input-icon"} onClick={this.togglePopup}/>
            <div className={defaultClass+'-popup'}>
                <div className={defaultClass+'-popup-arrow'} />
                {this.props.range && (<div className={defaultClass+'-row'}>
                    <div className={"range-container"}>
                        <div className={"left"}>
                            <span>开始时间： </span><Input value={this.display('start')} />
                            <span className="end">结束时间： </span><Input value={this.display('end')} />
                        </div>
                        <div className={"right"}>
                            <Button onClick={this.rangeCalendarCancel}>取消</Button>
                            <Button onClick={this.rangeCalendarSave}className="primary">保存</Button>
                        </div>
                    </div>
                </div>)}
                <div className={defaultClass+'-row'}>
                    {this.props.range ? (
                        <div className={defaultClass+'-row-range'}>
                            <Calendar value={this.state.startValuePreview} onChange={this.startCalendarChange} range={"start"} />
                            <Calendar value={this.state.endValuePreview} onChange={this.endCalendarChange} range={"end"} />
                        </div>
                    ) : (
                        <Calendar value={this.state.value} onChange={this.onCalendarChange} />
                    )}
                </div>
            </div>
        </div>
    }
});