var Example = React.createClass({
    onClickHandler:function(e) {
        RUI.DialogManager.alert("click:" + e, "提示");
    },
    render:function() {
        return <div className="example-button">
            <h2 className="title">按钮<span>Button</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <RUI.Button className="primary">主题</RUI.Button>
                <RUI.Button>按钮</RUI.Button>
                <RUI.Button onClick={this.onClickHandler}>点击</RUI.Button>
                <RUI.Button onClick={this.onClickHandler} disable={true}>禁用</RUI.Button>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./button.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;