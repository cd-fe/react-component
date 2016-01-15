var Test = React.createClass({
    getInitialState:function() {
        return {
            input_value:"123",
            initData:1
        };
    },
    inputChange:function() {
        console.log('input change');
    },
    componentDidMount:function() {
        setTimeout(function() {
            this.setState({
                input_value:999,
                initData:0
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
    selectCallback : function(e) {
        console.dir(this.refs.selectBody._getChoose());
        console.dir(this.refs.selectBody._choose);
        console.dir(this.refs.selectBody);
    },
    filterHandle : function() {
        return [
            {
                key : '新的',
                value : 'new'
            }
        ];
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
        var tableData = [
            {id:1, name:"商品测试1", category:"爆品", price:"199", percent:'10'},
            {id:2, name:"商品测试2", category:"热销", price:"399", percent:'10'},
            {id:3, name:"商品测试3", category:"预热", price:"299", percent:'10'},
            {id:4, name:"商品测试4", category:"当季推荐", price:"99", percent:'10'}
        ];
        return <div>
            <RUI.DatePicker value={Date.now()} format={new RUI.DateFormatter("Y-m-d")} range={false} />
            <br/>
            <RUI.DatePicker value={Date.now()} format={new RUI.DateFormatter("Y-m-d")} range={true} />
            <br/>
            <RUI.Table dataSource={tableData}>
                <RUI.Column checkbox={true}>
                    <RUI.Table.TitleRender>
                        <RUI.Checkbox selected={0} />
                    </RUI.Table.TitleRender>
                    <RUI.Table.ItemRender>
                        <RUI.Checkbox selected={0} />
                    </RUI.Table.ItemRender>
                </RUI.Column>
                <RUI.Column title={"商品名称"} dataField={"name"}/>
                <RUI.Column title={"所属分类"} dataField={"category"} />
                <RUI.Column title={"销售价"} dataField={"price"} />
                <RUI.Column title={"返佣比例"} dataField={"percent"} />
                <RUI.Column title={"操作"}>
                    <RUI.Table.ItemRender>
                        <RUI.Button>删除</RUI.Button>
                    </RUI.Table.ItemRender>
                </RUI.Column>
            </RUI.Table>
            <br/>
            <RUI.CheckboxGroup ref="checkboxGroup" onChange={this.groupChange}>
                <RUI.Checkbox value="type_1" selected={this.state.initData}>初始已选</RUI.Checkbox>
                <RUI.Checkbox value="type_2" selected={0}>初始未选</RUI.Checkbox>
                <RUI.Checkbox value="type_3" selected={1} onChange={this.valueChange}>自身含事件</RUI.Checkbox>
            </RUI.CheckboxGroup>
            <br/>
            <RUI.Radio value="type_1" selected={1} onChange={this.valueChange}>初始已选</RUI.Radio>
            <RUI.Radio value="type_2" selected={0}>初始未选</RUI.Radio>
            <RUI.Radio value="type_3" selected={0} disable={true}>禁用状态</RUI.Radio>
            <br/>
            <RUI.Checkbox value="type_1" selected={1} onChange={this.valueChange}>初始已选</RUI.Checkbox>
            <RUI.Checkbox value="type_2" selected={0}>初始未选</RUI.Checkbox>
            <RUI.Checkbox value="type_3" selected={0} disable={true}>禁用状态</RUI.Checkbox>
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
            <RUI.Button hello="mmmmm">
                <span>上方Tooltip</span>
                <RUI.Tooltip align="top-center">上方示例</RUI.Tooltip>
            </RUI.Button>

            <br/>
            <br/>
            <RUI.Select
                data={[{key:'查看',value:'1'}]}
                value={{key:'查看',value:'1'}}
                event={'click'}
                className="rui-theme-1">
            </RUI.Select>
            <br/>
            <br/>

            <RUI.Select
                data={[{key:'查看',value:'1'}]}
                value={{key:'查看',value:'1'}}
                className="rui-theme-2"
                offset={'0'}>
            </RUI.Select>
            <br/>
            <br/>
            <RUI.Select
                data={[{key:'查看',value:'1'}]}
                value={{key:'查看',value:'1'}}
                filter={true}
                className="rui-theme-3"
                stuff={true}
                filterCallback={this.filterHandle}>
            </RUI.Select>
            <br/>
            <br/>
            <br/>
            <RUI.Select
                ref="selectBody"
                data={[{key:'查看',value:'1'},{key:'你好',value:'2'}]}
                value={{key:'查看',value:'1'}}
                className="rui-theme-3"
                stuff={true}
                callback={this.selectCallback}>
            </RUI.Select>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>;
    }
});

ReactDOM.render(<Test />, document.getElementById('wrapper'));
