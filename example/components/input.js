var Example = React.createClass({
    getInitialState:function() {
        return {
            init:"init string"
        }
    },
    onInputChange:function(e) {
        RUI.DialogManager.alert("change:" + e.target.value, "提示");
    },
    blurHandler:function(e) {
        this.setState({
            init:Math.random()
        });
    },
    render:function() {
        return <div className="example-input">
            <h2 className="title">输入框<span>Input</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">输入框</h4>
                <div>
                    <RUI.Input value={this.state.init} onChange={this.onInputChange} /><br/>
                    <RUI.Input className="small" mode="static" value={"不可修改"}/><br/>
                    <RUI.Input onBlur={this.blurHandler} className="medium" placeholder="保留正常结点属性"/><br/>
                    <RUI.Input className="large"/><br/>
                    <RUI.Input className="full"/>
                </div>
                <h4 className="final-title">文本域</h4>
                <div>
                    <RUI.Textarea value={this.state.init} />
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./input.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;