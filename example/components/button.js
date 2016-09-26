var Example = React.createClass({
    getInitialState:function() {
        return {
            success:false,
            error:false
        };
    },
    onClickHandler:function(e) {
        RUI.DialogManager.alert("click:" + e, "提示");
    },
    successClick:function() {
        this.setState({
            success:true
        });
    },
    errorClick:function() {
        this.setState({
            error:true
        });
    },
    render:function() {
        return <div className="example-button">
            <h2 className="title">按钮<span>Button</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">主题</h4>
                <div>
                    <RUI.Button className="primary">一级按钮</RUI.Button>
                    <RUI.Button>次级按钮</RUI.Button>
                    <RUI.Button className="green">成功按钮</RUI.Button>
                    <RUI.Button onClick={this.onClickHandler} disable={true}>禁用</RUI.Button>
                </div>
                <h4 className="final-title">图标按钮</h4>
                <div>
                    <RUI.Button className="primary" icon="loading">加载中…</RUI.Button>
                    <RUI.Button
                        className=""
                        onClick={this.successClick}
                        icon={this.state.success&&'success'}
                        iconHideDelay={3000}>
                        点击后成功
                    </RUI.Button>
                    <RUI.Button
                        className=""
                        onClick={this.errorClick}
                        icon={this.state.error&&'error'}
                        iconHideDelay={3000}>
                        点击后失败
                    </RUI.Button>
                </div>
                <h4 className="final-title">点击事件</h4>
                <div>
                    <RUI.Button onClick={this.onClickHandler}>点击</RUI.Button>
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