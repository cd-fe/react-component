var Example = React.createClass({
    onClickHandler:function(e) {
        RUI.DialogManager.alert("click:" + e, "提示");
    },
    success:function() {
        this.refs.testSuccess.loading();
        setTimeout(function() {
            this.refs.testSuccess.success();
        }.bind(this), 1000);
    },
    error:function() {
        this.refs.testError.loading();
        setTimeout(function() {
            this.refs.testError.error();
        }.bind(this), 1000);
    },
    render:function() {
        return <div className="example-button">
            <h2 className="title">按钮<span>Button</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">主题</h4>
                <div>
                    <RUI.Button className="primary">主题</RUI.Button>
                    <RUI.Button>按钮</RUI.Button>
                    <RUI.Button onClick={this.onClickHandler}>点击</RUI.Button>
                    <RUI.Button onClick={this.onClickHandler} disable={true}>禁用</RUI.Button>
                </div>
                <h4 className="final-title">加载状态</h4>
                <div>
                    <RUI.Button ref="testSuccess" onClick={this.success} className="primary">保存成功</RUI.Button>
                    <RUI.Button ref="testError" onClick={this.error} className="primary">保存失败</RUI.Button>
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./button.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;