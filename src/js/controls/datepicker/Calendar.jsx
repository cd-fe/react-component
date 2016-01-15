import omit from "../../util/omit.jsx";
import DateFormatter from '../../formatters/DateFormatter.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';

var CalendarItem = React.createClass({
    getDefaultProps:function() {
        return {
            value:""
        };
    },
    clickHandler:function() {
        if((this.props.className || "").indexOf('disabled') < 0) {
            this.props.onClick && this.props.onClick(this.props.value);
        }
    },
    render:function() {
        var props = omit(this.props, 'value', 'onClick');
        var formatter = new DateFormatter("d");
        return <td {...props} onClick={this.clickHandler}><span>{formatter.format(this.props.value)}</span></td>;
    }
});

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            value:this.props.value
        };
    },
    componentWillReceiveProps:function(newProps) {
        if(newProps.value) {
            this.setState({
                value:newProps.value
            });
        }
    },
    prevMonth:function() {
        var formatter = new DateFormatter();
        formatter.setTime(this.state.value);
        formatter.dateTo('m', -1);

        this.setState({
            value:formatter.getTime()
        });
    },
    nextMonth:function() {
        var formatter = new DateFormatter();
        formatter.setTime(this.state.value);
        formatter.dateTo('m', 1);

        this.setState({
            value:formatter.getTime()
        });
    },
    onItemClick:function(value) {
        var event = new Event('change');
        event.data = value;
        this.dispatchEvent(event);
    },
    render:function() {
        var _this = this;
        var monthValue = new DateFormatter("Y年m月");
        monthValue.setTime(this.state.value);

        var rows = [1,2,3,4,5,6];
        var columns = ['一', '二', '三', '四', '五', '六', '日'];

        var currentMonthFirstDay = new Date(monthValue.getSource().getYear(), monthValue.getSource().getMonth());
        var currentIndex = currentMonthFirstDay.getDay() + monthValue.getSource().getDate();
        var firstIndex = currentMonthFirstDay.getDay();
        var lastIndex =  currentMonthFirstDay.getDay() + monthValue.getCurrentMonthDays();

        var tds = rows.map(function(item, row) {
            return <tr>
                {columns.map(function(item, column) {
                    var index = column + row * columns.length;
                    var date = new DateFormatter().setTime(monthValue.getTime());
                    date.dateTo('d', index - currentIndex);

                    var classes = [];
                    if(index <= firstIndex || index > lastIndex) {
                        classes.push('disabled');
                    }
                    if(index == currentIndex) {
                        classes.push('selected');
                    }

                    return <CalendarItem value={date.getTime()} className={classes.join(" ")} onClick={_this.onItemClick} />;
                })}
            </tr>;
        });

        return <div className={"rui-datepicker-calendar"}>
            <div className={"rui-datepicker-calendar-title"}>
                <a href="javascript:;" className={"rui-datepicker-calendar-left"} onClick={this.prevMonth}></a>
                <span>{monthValue.format(this.state.value)}</span>
                <a href="javascript:;" className={"rui-datepicker-calendar-right"} onClick={this.nextMonth}></a>
            </div>
            <table className={"rui-datepicker-calendar-table"}>
                <thead>
                {columns.map(function(item) {
                    return <th>{item}</th>
                })}
                </thead>
                <tbody>
                {tds}
                </tbody>
            </table>
        </div>;
    }
});