/**
 * 时间选择器组件
 * @module controls/TimePicker
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Spinner from '../controls/Spinner.jsx';
import Formatter from '../formatters/DateFormatter.jsx';

import '../../css/timerpicker.scss';

module.exports = React.createClass({
    mixins: [ComponentBase],
    getInitialState: function () {
        return {
            value: this.props.value
        };
    },
    getDefaultProps: function () {
        return {
            cname: 'timepicker',
            value: Date.now()
        };
    },
    componentWillReceiveProps: function (nextProps) {
        if (typeof nextProps.value != 'undefined') {
            this.setState({
                value: nextProps.value
            });
        }
    },
    getSpinnerProps: function () {
        var formatter = new Formatter();
        formatter.setTime(this.state.value);

        var common = {
            className: 'rui-timerpicker-spinner',
            fieldFunction: function (str) {
                return str.toString().length < 2 ? '0' + str : str;
            }
        };

        return {
            hour: Object.assign({
                ref: 'hour',
                min: 0,
                max: 23,
                value: formatter.setPattern('H').toString()
            }, common),
            minute: Object.assign({
                ref: 'minute',
                min: 0,
                max: 59,
                value: formatter.setPattern('i').toString()
            }, common),
            second: Object.assign({
                ref: 'second',
                min: 0,
                max: 59,
                value: formatter.setPattern('s').toString()
            }, common)
        };
    },
    getValue: function () {
        var date = new Date(this.state.value);
        date.setHours(this.refs.hour.getValue());
        date.setMinutes(this.refs.minute.getValue());
        date.setSeconds(this.refs.second.getValue());

        return {
            value: date.getTime(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        var props = require('../util/omit.jsx')(this.props, 'value');

        return <div {...props} className={classes + ' clearfix'}>
            <Spinner {...this.getSpinnerProps().hour} style={{marginLeft:11}}/>
            <span className={this.getDefaultClass() + '-span'}>:</span>
            <Spinner {...this.getSpinnerProps().minute} />
            <span className={this.getDefaultClass() + '-span'}>:</span>
            <Spinner {...this.getSpinnerProps().second} />
        </div>
    }
});