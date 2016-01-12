var Test = React.createClass({
    getInitialState:function() {
        return {
            input_value:"123"
        };
    },
    inputChange:function() {
        console.log('input change');
    },
    componentDidMount:function() {
        setTimeout(function() {
            this.setState({
                input_value:999
            });
        }.bind(this), 3000);
    },
    showDialog:function() {
        this.refs.dialog.show();
    },
    dialogCancel:function() {
        alert('dialog cancel');
    },
    dialogSubmit:function() {
        alert('dialog submit');
    },
    showAlert:function() {
        RUI.DialogManager.alert('Test');
        RUI.DialogManager.alert('Test', 'Test Title');
    },
    showConfirm:function() {
        RUI.DialogManager.confirm('somthing');
        RUI.DialogManager.confirm({
            message:'Are you kidding me ?',
            title:'Just a joke',
            submit:function() {
                alert('you are joke me');
            }
        })
    },
    selectCallback : function() {
        console.log('it is select');
    },
    onPage:function(index) {
        alert(index);
    },
    render:function() {
        return <div>
            <RUI.Button className="primary" onClick={this.showDialog}>测试Dialog</RUI.Button>
            <RUI.Button onClick={this.showAlert}>测试Alert</RUI.Button>
            <RUI.Button onClick={this.showConfirm}>测试Confirm</RUI.Button>
            <br/>
            <RUI.Input value={this.state.input_value} onChange={this.inputChange} />
            <br/>
            <RUI.Pagination pageSize="10" currentPage="5" totalNum="78" onPage={this.onPage} />
            <br/>
            <RUI.Dialog ref="dialog" title="测试标题" buttons="submit,cancel" onCancel={this.dialogCancel} onSubmit={this.dialogSubmit}>
                <div style={{width:'240px', wordWrap:'break-word'}}>
                    qqqqqqqqqqqqq
                </div>
            </RUI.Dialog>
            <br/>
            <RUI.Button hello="mmmmm">
                <span>上方Tooltip</span>
                <RUI.Tooltip align="top-center">上方示例</RUI.Tooltip>
            </RUI.Button>

            <br/>
            <br/>
            <RUI.Select refs="select" data={["查看", "编辑", "解雇"]} value={["查看"]} event={'click'} className="rui-theme-1"></RUI.Select>
            <br/>
            <br/>

            <RUI.Select refs="select" data={["查看", "编辑", "解雇"]} value={["查看"]} className="rui-theme-2" offset={'0'}></RUI.Select>
            <br/>
            <br/>

            <RUI.Select refs="select" data={["查看", "编辑", "解雇"]} value={["全部"]} className="rui-theme-3" stuff={true} callback={this.selectCallback}></RUI.Select>
            <br/>
            <br/>
            <RUI.Select refs="select" data={["查看", "编辑", "解雇"]} filter={true} value={["全部"]} className="rui-theme-3" stuff={true} ></RUI.Select>

        </div>;
    }
});

ReactDOM.render(<Test />, document.getElementById('wrapper'));
