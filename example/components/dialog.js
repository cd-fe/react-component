var Example = React.createClass({
    showDialog:function() {
        this.refs.dialog.show();
    },
    dialogCancel:function() {
        RUI.DialogManager.alert("自定义弹出层的取消按钮点击了");
    },
    dialogSubmit:function() {
        RUI.DialogManager.alert("自定义弹出层的确认按钮点击了");
    },
    showAlert:function() {
        RUI.DialogManager.alert({
            title:'弹出提示',
            message:'自定义标题',
            submit:function() {
                RUI.DialogManager.alert('alert的确定按钮点击了');
            },
            submitText:'知道了'
        });
    },
    showConfirm:function() {
        RUI.DialogManager.confirm('真的要删除么？');
    },
    showConfirmCustom:function() {
        RUI.DialogManager.confirm({
            message:'确定要删除么?',
            title:'自定义标题',
            submit:function() {
                RUI.DialogManager.alert('确定按钮被点击了');
            },
            submitText:'删除吧'
        });
    },
    componentDidMount:function() {
        RUI.DialogManager.alert("提示1");
        RUI.DialogManager.confirm("提示2");
    },
    render:function() {
        return <div className="example-button">
            <h2 className="title">弹出层<span>Dialog</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <RUI.Button className="primary" onClick={this.showDialog}>自定义内容</RUI.Button>
                <RUI.Button onClick={this.showAlert}>默认Alert</RUI.Button>
                <RUI.Button onClick={this.showConfirm}>默认Confirm</RUI.Button>
                <RUI.Button onClick={this.showConfirmCustom}>自定义Confirm</RUI.Button>

                <RUI.Dialog ref="dialog" title="测试标题" draggable={false} buttons="submit,cancel" onCancel={this.dialogCancel} onSubmit={this.dialogSubmit}>
                    <div style={{width:'240px', wordWrap:'break-word'}}>
                        <p>在这里可以自定义任何节点和内容</p>
                    </div>
                </RUI.Dialog>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./dialog.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;