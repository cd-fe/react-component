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
    onPage:function(index) {
        alert(index);
    },
    render:function() {
        return <div>
            <RUI.Button className="primary" onClick={this.showDialog}>测试Dialog</RUI.Button>
            <br/>
            <RUI.Input value={this.state.input_value} onChange={this.inputChange} />
            <br/>
            <RUI.Pagination pageSize="10" currentPage="5" totalNum="78" onPage={this.onPage} />
            <br/>
            <RUI.Dialog ref="dialog" title="测试标题" buttons="submit,cancel" onCancel={this.dialogCancel} onSubmit={this.dialogSubmit}>
                <div style={{width:'240px',height:'100px'}}>
                    12345678901234567890123456789012345678901234567890123456789012345678901234567890
                    1234567890123456789012345678901234567890123456789012345678901234567890
                </div>
            </RUI.Dialog>
        </div>;
    }
});

ReactDOM.render(<Test />, document.getElementById('wrapper'));
