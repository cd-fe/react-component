var Example = React.createClass({
    getInitialState:function() {
        return {
            init:"init string"
        }
    },
    onInputChange:function(e) {
        RUI.DialogManager.alert("change:" + e.target.value, "提示");
    },
    render:function() {
        return <div className="example-input">
            <h2 className="title">输入框<span>Input</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <RUI.Input value={this.state.init} onChange={this.onInputChange} /><br/>
                <RUI.Input className="small" mode="static" value={"不可修改"}/><br/>
                <RUI.Input className="medium" placeholder="保留正常结点属性"/><br/>
                <RUI.Input className="large"/><br/>
                <RUI.Input className="full"/>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./input.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;