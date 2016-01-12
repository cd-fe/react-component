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
    onPage:function(index) {
        alert(index);
    },
    valueChange:function(event) {
        console.log(event);
    },
    groupChange:function(event) {
        alert(event.data);
    },
    render:function() {
        return <div>
            <RUI.CheckboxGroup ref="checkboxGroup" onChange={this.groupChange}>
                <RUI.Checkbox value={1}>初始已选</RUI.Checkbox>
                <RUI.Checkbox value={0}>初始未选</RUI.Checkbox>
                <RUI.Checkbox value={1} onChange={this.valueChange}>自身含事件</RUI.Checkbox>
            </RUI.CheckboxGroup>
            <br/>
            <RUI.Radio value={1} onChange={this.valueChange}>初始已选</RUI.Radio>
            <RUI.Radio value={0}>初始未选</RUI.Radio>
            <RUI.Radio value={0} disable={true}>禁用状态</RUI.Radio>
            <br/>
            <RUI.Checkbox value={1} onChange={this.valueChange}>初始已选</RUI.Checkbox>
            <RUI.Checkbox value={0}>初始未选</RUI.Checkbox>
            <RUI.Checkbox value={0} disable={true}>禁用状态</RUI.Checkbox>
            <br/>
            <RUI.Button className="primary" onClick={this.showDialog}>测试Dialog</RUI.Button>
            <RUI.Button onClick={this.showAlert}>测试Alert</RUI.Button>
            <RUI.Button onClick={this.showConfirm}>测试Confirm</RUI.Button>
            <br/>
            <RUI.Input value={this.state.input_value} onChange={this.inputChange} /><br/>
            <RUI.Input className="small"/><br/>
            <RUI.Input className="medium"/><br/>
            <RUI.Input className="large"/><br/>
            <RUI.Input className="full"/>
            <br/>
            <RUI.Pagination pageSize="10" currentPage="5" totalNum="78" onPage={this.onPage} />
            <br/>
            <RUI.Dialog ref="dialog" title="测试标题" buttons="submit,cancel" onCancel={this.dialogCancel} onSubmit={this.dialogSubmit}>
                <div style={{width:'240px', wordWrap:'break-word'}}>
                    qqqqqqqqqqqqq
                </div>
            </RUI.Dialog>
            <br/>
            <RUI.Button>
                <span>上方Tooltip</span>
                <RUI.Tooltip align="top-center">上方示例</RUI.Tooltip>
            </RUI.Button>
        </div>;
    }
});

ReactDOM.render(<Test />, document.getElementById('wrapper'));
