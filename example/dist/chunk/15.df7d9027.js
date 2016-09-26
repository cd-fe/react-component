webpackJsonp([15],{

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	var Example = React.createClass({
	    displayName: "Example",
	
	    getSinglePickerValue: function (ref) {
	        RUI.DialogManager.alert(JSON.stringify(this.refs[ref].getValue()));
	    },
	    setRangePickerValue: function () {
	        this.refs.rangeDatePicker.setValue({
	            startValue: Date.now() - 86400 * 1000 * 90,
	            endValue: Date.now()
	        });
	    },
	    render: function () {
	        return React.createElement(
	            "div",
	            { className: "example-input" },
	            React.createElement(
	                "h2",
	                { className: "title" },
	                "日历",
	                React.createElement(
	                    "span",
	                    null,
	                    "Datepicker"
	                )
	            ),
	            React.createElement(
	                "h3",
	                { className: "sub-title" },
	                "演示"
	            ),
	            React.createElement(
	                "div",
	                { className: "example" },
	                React.createElement(
	                    "h4",
	                    { className: "final-title" },
	                    "单个日历"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(RUI.DatePicker, { ref: "singleDatePicker" }),
	                    React.createElement(
	                        RUI.Button,
	                        { onClick: this.getSinglePickerValue.bind(this, 'singleDatePicker') },
	                        "获取结果"
	                    )
	                ),
	                React.createElement(
	                    "h4",
	                    { className: "final-title" },
	                    "带时间"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(RUI.DatePicker, { ref: "singleDatetimePicker", showTime: true, onChange: () => console.log('change') }),
	                    React.createElement(
	                        RUI.Button,
	                        { onClick: this.getSinglePickerValue.bind(this, 'singleDatetimePicker') },
	                        "获取结果"
	                    )
	                ),
	                React.createElement(
	                    "h4",
	                    { className: "final-title" },
	                    "改变显示格式"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(RUI.DatePicker, { value: Date.now(), formatter: new RUI.DateFormatter("Y/m/d"), onChange: this.datePickerChange })
	                ),
	                React.createElement(
	                    "h4",
	                    { className: "final-title" },
	                    "嵌套Tooltip"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        RUI.DatePicker,
	                        { value: Date.now(), formatter: new RUI.DateFormatter("Y-m-d"), range: false },
	                        React.createElement(
	                            RUI.Tooltip,
	                            { align: "top-center", trigger: "click" },
	                            "嵌套使用，click触发"
	                        )
	                    )
	                ),
	                React.createElement(
	                    "h4",
	                    { className: "final-title" },
	                    "日历开始结束"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(RUI.DatePicker, { startValue: '', endValue: '', formatter: new RUI.DateFormatter("Y-m-d"), range: true, onChange: this.datePickerChange })
	                ),
	                React.createElement(
	                    "h4",
	                    { className: "final-title" },
	                    "外层设置范围"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(RUI.DatePicker, { ref: "rangeDatePicker", range: true }),
	                    React.createElement(
	                        RUI.Button,
	                        { onClick: this.setRangePickerValue },
	                        "三个月内"
	                    )
	                )
	            ),
	            React.createElement(
	                "h3",
	                { className: "sub-title" },
	                "源码"
	            ),
	            React.createElement(
	                "div",
	                { className: "source" },
	                React.createElement("textarea", { defaultValue: __webpack_require__(92) })
	            )
	        );
	    }
	});
	
	module.exports = Example;

/***/ },

/***/ 92:
/***/ function(module, exports) {

	module.exports = "var Example = React.createClass({\n    getSinglePickerValue:function(ref) {\n        RUI.DialogManager.alert(JSON.stringify(this.refs[ref].getValue()));\n    },\n    setRangePickerValue:function() {\n        this.refs.rangeDatePicker.setValue({\n            startValue:Date.now() - 86400 * 1000 * 90,\n            endValue:Date.now()\n        });\n    },\n    render:function() {\n        return <div className=\"example-input\">\n            <h2 className=\"title\">日历<span>Datepicker</span></h2>\n            <h3 className=\"sub-title\">演示</h3>\n            <div className=\"example\">\n                <h4 className=\"final-title\">单个日历</h4>\n                <div>\n                    <RUI.DatePicker ref=\"singleDatePicker\" />\n                    <RUI.Button onClick={this.getSinglePickerValue.bind(this, 'singleDatePicker')}>获取结果</RUI.Button>\n                </div>\n                <h4 className=\"final-title\">带时间</h4>\n                <div>\n                    <RUI.DatePicker ref=\"singleDatetimePicker\" showTime={true} onChange={()=>console.log('change')} />\n                    <RUI.Button onClick={this.getSinglePickerValue.bind(this, 'singleDatetimePicker')}>获取结果</RUI.Button>\n                </div>\n                <h4 className=\"final-title\">改变显示格式</h4>\n                <div>\n                    <RUI.DatePicker value={Date.now()} formatter={new RUI.DateFormatter(\"Y/m/d\")} onChange={this.datePickerChange} />\n                </div>\n                <h4 className=\"final-title\">嵌套Tooltip</h4>\n                <div>\n                    <RUI.DatePicker value={Date.now()} formatter={new RUI.DateFormatter(\"Y-m-d\")} range={false}>\n                        <RUI.Tooltip align=\"top-center\" trigger=\"click\">嵌套使用，click触发</RUI.Tooltip>\n                    </RUI.DatePicker>\n                </div>\n                <h4 className=\"final-title\">日历开始结束</h4>\n                <div>\n                    <RUI.DatePicker startValue={''} endValue={''} formatter={new RUI.DateFormatter(\"Y-m-d\")} range={true} onChange={this.datePickerChange} />\n                </div>\n                <h4 className=\"final-title\">外层设置范围</h4>\n                <div>\n                    <RUI.DatePicker ref=\"rangeDatePicker\" range={true} />\n                    <RUI.Button onClick={this.setRangePickerValue}>三个月内</RUI.Button>\n                </div>\n            </div>\n            <h3 className=\"sub-title\">源码</h3>\n            <div className=\"source\">\n                <textarea defaultValue={require('raw!./datepicker.js')} />\n            </div>\n        </div>;\n    }\n});\n\nmodule.exports = Example;"

/***/ }

});