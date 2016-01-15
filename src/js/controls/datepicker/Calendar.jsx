import DateFormatter from '../../formatters/DateFormatter.jsx';

module.exports = React.createClass({
    render:function() {
        var monthValue = new DateFormatter("Y年m月");

        return <div className={"rui-datepicker-calendar"}>
            <div className={"rui-datepicker-calendar-title"}>
                <a href="javascript:;" className={"rui-datepicker-calendar-left"}></a>
                <span>{monthValue.format(this.props.value)}</span>
                <a href="javascript:;" className={"rui-datepicker-calendar-right"}></a>
            </div>
            <table className={"rui-datepicker-calendar-table"}>
                <thead>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                    <th>七</th>
                </thead>
            </table>
        </div>;
    }
});