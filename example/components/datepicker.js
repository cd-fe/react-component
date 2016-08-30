var Example = React.createClass({
    getSinglePickerValue:function(ref) {
        RUI.DialogManager.alert(JSON.stringify(this.refs[ref].getValue()));
    },
    setRangePickerValue:function() {
        this.refs.rangeDatePicker.setValue({
            startValue:Date.now() - 86400 * 1000 * 90,
            endValue:Date.now()
        });
    },
    render:function() {
        return <div className="example-input">
            <h2 className="title">日历<span>Datepicker</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">单个日历</h4>
                <div>
                    <RUI.DatePicker ref="singleDatePicker" />
                    <RUI.Button onClick={this.getSinglePickerValue.bind(this, 'singleDatePicker')}>获取结果</RUI.Button>
                </div>
                <h4 className="final-title">带时间</h4>
                <div>
                    <RUI.DatePicker ref="singleDatetimePicker" showTime={true} />
                    <RUI.Button onClick={this.getSinglePickerValue.bind(this, 'singleDatetimePicker')}>获取结果</RUI.Button>
                </div>
                <h4 className="final-title">改变显示格式</h4>
                <div>
                    <RUI.DatePicker value={Date.now()} formatter={new RUI.DateFormatter("Y/m/d")} onChange={this.datePickerChange} />
                </div>
                <h4 className="final-title">嵌套Tooltip</h4>
                <div>
                    <RUI.DatePicker value={Date.now()} formatter={new RUI.DateFormatter("Y-m-d")} range={false}>
                        <RUI.Tooltip align="top-center" trigger="click">嵌套使用，click触发</RUI.Tooltip>
                    </RUI.DatePicker>
                </div>
                <h4 className="final-title">日历开始结束</h4>
                <div>
                    <RUI.DatePicker value={Date.now()} formatter={new RUI.DateFormatter("Y-m-d")} range={true} onChange={this.datePickerChange} />
                </div>
                <h4 className="final-title">外层设置范围</h4>
                <div>
                    <RUI.DatePicker ref="rangeDatePicker" range={true} />
                    <RUI.Button onClick={this.setRangePickerValue}>三个月内</RUI.Button>
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./datepicker.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;