var timer = Date.now();
var Example = React.createClass({
    getInitialState:function() {
        this.changeFormatter = new RUI.DateFormatter("Y/m/d");
        this.formatter = new RUI.DateFormatter("Y-m-d");
        return {
            val:""
        };
    },
    setChange : function(e) {
        console.dir(e.data);
        this.setState({
            time : e.data
        });
    },
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
        var minDate = new Date(2016,7,25);
        var maxDate = new Date(2016,10,25);
        return <div className="example-input">
            <h2 className="title">日历<span>Datepicker</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">单个日历</h4>
                <div>
                    <RUI.DatePicker ref="singleDatePicker" />
                    <RUI.Button onClick={this.getSinglePickerValue.bind(this, 'singleDatePicker')}>获取结果</RUI.Button>
                </div>
                <h4 className="final-title">禁用状态</h4>
                <div>
                    <RUI.DatePicker disable={true} />
                </div>
                <h4 className="final-title">带时间</h4>
                <div>
                    <RUI.DatePicker ref="singleDatetimePicker" onChange={this.setChange} showTime={true} value={this.state.time || timer} />
                    <RUI.DatePicker ref="rangeDatetimePicker" showTime={true} range={true} />
                    <RUI.Button onClick={this.getSinglePickerValue.bind(this, 'rangeDatetimePicker')}>获取结果</RUI.Button>
                </div>
                <h4 className="final-title">改变显示格式</h4>
                <div>
                    <RUI.DatePicker formatter={this.changeFormatter} onChange={this.datePickerChange} />
                </div>
                <h4 className="final-title">嵌套Tooltip</h4>
                <div>
                    <RUI.DatePicker formatter={this.formatter} range={false}>
                        <RUI.Tooltip align="top-center" trigger="click">嵌套使用，click触发</RUI.Tooltip>
                    </RUI.DatePicker>
                </div>
                <h4 className="final-title">日历开始结束</h4>
                <div>
                    <RUI.DatePicker
                        startValue={''} endValue={''}
                        formatter={this.formatter}
                        range={true} onChange={this.datePickerChange}
                        max={maxDate.getTime()}
                        min={minDate.getTime()}
                    />
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