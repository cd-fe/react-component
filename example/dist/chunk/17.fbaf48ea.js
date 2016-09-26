webpackJsonp([17],{

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	var Example = React.createClass({
	    displayName: "Example",
	
	    getInitialState: function () {
	        return {
	            success: false,
	            error: false
	        };
	    },
	    onClickHandler: function (e) {
	        RUI.DialogManager.alert("click:" + e, "提示");
	    },
	    render: function () {
	        return React.createElement(
	            "div",
	            { className: "example-button" },
	            React.createElement(
	                "h2",
	                { className: "title" },
	                "按钮",
	                React.createElement(
	                    "span",
	                    null,
	                    "Button"
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
	                    "主题"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        RUI.Button,
	                        { className: "primary" },
	                        "一级按钮"
	                    ),
	                    React.createElement(
	                        RUI.Button,
	                        null,
	                        "次级按钮"
	                    ),
	                    React.createElement(
	                        RUI.Button,
	                        { className: "green" },
	                        "成功按钮"
	                    ),
	                    React.createElement(
	                        RUI.Button,
	                        { onClick: this.onClickHandler, disable: true },
	                        "禁用"
	                    )
	                ),
	                React.createElement(
	                    "h4",
	                    { className: "final-title" },
	                    "图标按钮"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        RUI.Button,
	                        { className: "primary", icon: "loading" },
	                        "加载中…"
	                    ),
	                    React.createElement(
	                        RUI.Button,
	                        {
	                            className: "",
	                            onClick: () => this.setState({ success: true }),
	                            icon: this.state.success && 'success',
	                            iconHideDelay: 3000 },
	                        "点击后成功"
	                    ),
	                    React.createElement(
	                        RUI.Button,
	                        {
	                            className: "",
	                            onClick: () => this.setState({ error: true }),
	                            icon: this.state.error && 'error',
	                            iconHideDelay: 3000 },
	                        "点击后失败"
	                    )
	                ),
	                React.createElement(
	                    "h4",
	                    { className: "final-title" },
	                    "点击事件"
	                ),
	                React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        RUI.Button,
	                        { onClick: this.onClickHandler },
	                        "点击"
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
	                React.createElement("textarea", { defaultValue: __webpack_require__(90) })
	            )
	        );
	    }
	});
	
	module.exports = Example;

/***/ },

/***/ 90:
/***/ function(module, exports) {

	module.exports = "var Example = React.createClass({\n    getInitialState:function() {\n        return {\n            success:false,\n            error:false\n        };\n    },\n    onClickHandler:function(e) {\n        RUI.DialogManager.alert(\"click:\" + e, \"提示\");\n    },\n    render:function() {\n        return <div className=\"example-button\">\n            <h2 className=\"title\">按钮<span>Button</span></h2>\n            <h3 className=\"sub-title\">演示</h3>\n            <div className=\"example\">\n                <h4 className=\"final-title\">主题</h4>\n                <div>\n                    <RUI.Button className=\"primary\">一级按钮</RUI.Button>\n                    <RUI.Button>次级按钮</RUI.Button>\n                    <RUI.Button className=\"green\">成功按钮</RUI.Button>\n                    <RUI.Button onClick={this.onClickHandler} disable={true}>禁用</RUI.Button>\n                </div>\n                <h4 className=\"final-title\">图标按钮</h4>\n                <div>\n                    <RUI.Button className=\"primary\" icon=\"loading\">加载中…</RUI.Button>\n                    <RUI.Button\n                        className=\"\"\n                        onClick={()=>this.setState({success:true})}\n                        icon={this.state.success&&'success'}\n                        iconHideDelay={3000}>\n                        点击后成功\n                    </RUI.Button>\n                    <RUI.Button\n                        className=\"\"\n                        onClick={()=>this.setState({error:true})}\n                        icon={this.state.error&&'error'}\n                        iconHideDelay={3000}>\n                        点击后失败\n                    </RUI.Button>\n                </div>\n                <h4 className=\"final-title\">点击事件</h4>\n                <div>\n                    <RUI.Button onClick={this.onClickHandler}>点击</RUI.Button>\n                </div>\n            </div>\n            <h3 className=\"sub-title\">源码</h3>\n            <div className=\"source\">\n                <textarea defaultValue={require('raw!./button.js')} />\n            </div>\n        </div>;\n    }\n});\n\nmodule.exports = Example;"

/***/ }

});