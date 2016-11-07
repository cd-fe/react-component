import omit from "../../util/omit.jsx";
import DateFormatter from '../../formatters/DateFormatter.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';

var CalendarItem = React.createClass({
    getDefaultProps: function () {
        return {
            value: ""
        };
    },
    clickHandler: function (event) {
        if ((this.props.className || "").indexOf('disabled') < 0) {
            this.props.onClick && this.props.onClick(this.props.value, event);
        }
    },
    render: function () {
        var props = omit(this.props, 'value', 'onClick');
        var formatter = new DateFormatter("d");
        return <td {...props} onClick={this.clickHandler}><span>{formatter.format(this.props.value)}</span></td>;
    }
});

module.exports = React.createClass({
    mixins: [ComponentBase],
    getInitialState: function () {
        return {
            value: this.props.value
        };
    },
    getDefaultProps:function() {
        return {
            showTime:false
        };
    },
    componentWillReceiveProps: function (newProps) {
        if (newProps.value) {
            this.setState({
                value: newProps.value
            });
        }
    },
    checkSuper:function(targetTime) {
        var formatter = new RUI.DateFormatter();
        if(this.props.min !== null && isFinite(this.props.min)) {
            var date = new Date(targetTime);
            formatter.setTime(this.toDate(date.getTime()));
            formatter.getSource().setDate(formatter.getCurrentMonthDays());
            if(formatter.compare(this.props.min) < 0) {
                return 'min';
            }
        }
        if(this.props.max !== null && isFinite(this.props.max)) {
            var date = new Date(targetTime);
            formatter.setTime(this.toDate(date.getTime()));
            formatter.getSource().setDate(1);
            if(formatter.compare(this.props.max)  > 0) {
                return 'max';
            }
        }

        return false;
    },
    maxResult:function(time) {
        var max = 4070793600000; // 2099 年
        var min = 0;

        if(this.props.min !== null && isFinite(this.props.min)) {
            min = this.props.min;
        }
        if(this.props.max !== null && isFinite(this.props.max)) {
            max = this.props.max;
        }

        return Math.min(max, Math.max(min, time));
    },
    prevMonth: function () {
        var formatter = new DateFormatter();
        formatter.setTime(this.state.value);
        formatter.dateTo('m', -1);

        var hasSuper = this.checkSuper(formatter.getTime());
        if(!hasSuper) {
            var time = formatter.getTime();
            if (this.props.range) {
                var event = new Event('change');
                event.data = this.maxResult(time);
                this.dispatchEvent(event);
            } else {
                this.setState({
                    value: this.maxResult(time)
                });
            }
        }
    },
    nextMonth: function () {
        var formatter = new DateFormatter();
        formatter.setTime(this.state.value);
        formatter.dateTo('m', 1);

        var hasSuper = this.checkSuper(formatter.getTime());
        if(!hasSuper) {
            var time = formatter.getTime();
            if (this.props.range) {
                var event = new Event('change');
                event.data = this.maxResult(time);
                this.dispatchEvent(event);
            } else {
                this.setState({
                    value: this.maxResult(time)
                });
            }
        }
    },
    onItemClick: function (value, event) {
        event.type = 'change';
        event.data = value;
        this.dispatchEvent(event);
    },
    timeChange: function(event) {
        var times = event.data;
        if(times) {
            var date = new Date(this.state.value);
            date.setHours(times.hour);
            date.setMinutes(times.minute);
            date.setSeconds(times.second);

            event.data = date.getTime();

            this.dispatchEvent(event);
        }
    },
    toDate:function(time) {
        var date = new Date(time);
        date.setHours(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    onSubmitClick:function() {
        var times = this.refs.time.getValue();
        if(times) {
            var date = new Date(this.state.value);
            date.setHours(times.hour);
            date.setMinutes(times.minute);
            date.setSeconds(times.second);

            this.props.onSave && this.props.onSave(date.getTime());
        }
    },
    render: function () {
        var _this = this;
        var monthValue = new DateFormatter("Y年m月");
        monthValue.setTime(this.state.value);

        var rows = [1, 2, 3, 4, 5, 6];
        var columns = ['一', '二', '三', '四', '五', '六', '日'];

        var currentMonthFirstDay = new Date(monthValue.getSource().getYear(), monthValue.getSource().getMonth());
        var currentIndex = currentMonthFirstDay.getDay() + monthValue.getSource().getDate();
        var firstIndex = currentMonthFirstDay.getDay();
        var lastIndex = currentMonthFirstDay.getDay() + monthValue.getCurrentMonthDays();
        var tds = rows.map(function (item, row) {
            return <tr key={"calendar-" + row}>
                {columns.map(function (item, column) {
                    var index = column + row * columns.length;
                    var date = new DateFormatter().setTime(monthValue.getTime());
                    date.dateTo('d', index - currentIndex);

                    var classes = [];
                    var hasSuper = false;
                    if (index <= firstIndex || index > lastIndex) {
                        classes.push('disabled');
                    }

                    if(_this.props.max !== null && isFinite(_this.props.max)) {
                        if(date.compare(_this.props.max) > 0) {
                            classes.push('disabled');
                            hasSuper = true;
                        }
                    }
                    if(_this.props.min !== null && isFinite(_this.props.min)) {
                        if(date.compare(_this.props.min) < 0) {
                            classes.push('disabled');
                            hasSuper = true;
                        }
                    }

                    if(!hasSuper) {
                        if(_this.props.range == 'end') {
                            var formatStartTime = new Date(_this.props.source.start);
                            if(date.compare(formatStartTime) < 0) {
                                classes.push('disabled');
                            }
                        }

                        if(_this.props.range == 'start') {
                            var formatEndTime = new Date(_this.props.source.end);
                            if(date.compare(formatEndTime) > 0) {
                                classes.push('disabled');
                            }
                        }

                        if (_this.props.range == 'start') {
                            if (date.getTime() >= monthValue.getTime() && date.getTime() <= _this.props.source.end) {
                                classes.push('ranged');
                            }
                        }
                        if (_this.props.range == 'end') {
                            if (date.getTime() <= monthValue.getTime() && date.getTime() >= _this.props.source.start) {
                                classes.push('ranged');
                            }
                        }

                        if (index == currentIndex) {
                            classes.push('selected');
                        }
                    }

                    return <CalendarItem key={"calendar-"+row+column} value={date.getTime()} className={classes.join(" ")}
                                         onClick={_this.onItemClick}/>;
                })}
            </tr>;
        });

        var previewDate = new DateFormatter();

        previewDate.setTime(this.state.value);
        var prevMonthDate = previewDate.dateTo('m', -1).getTime();
        previewDate.setTime(this.state.value);
        var nextMonthDate = previewDate.dateTo('m', 1).getTime();

        return <div className={"rui-datepicker-calendar"}>
            <div className={"rui-datepicker-calendar-title"}>
                {this.checkSuper(prevMonthDate) != 'min' && <a href="javascript:;" className={"rui-datepicker-calendar-left"} onClick={this.prevMonth}></a>}
                <span>{monthValue.format(this.state.value)}</span>
                {this.checkSuper(nextMonthDate) != 'max' && <a href="javascript:;" className={"rui-datepicker-calendar-right"} onClick={this.nextMonth}></a>}
            </div>
            <table className={"rui-datepicker-calendar-table"}>
                <thead>
                    <tr>
                        {columns.map(function (item, index) {
                            return <th key={index}>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tds}
                </tbody>
            </table>
            {this.props.showTime && (
                <div className="rui-datepicker-time clearfix">
                    <RUI.TimePicker ref="time" value={this.state.value} onChange={this.timeChange} />
                </div>
            )}
        </div>;
    }
});