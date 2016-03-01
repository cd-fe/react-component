var Example = React.createClass({
    getInitialState:function() {
        return {
            ajaxData:[],
            data:this.getData()
        };
    },
    componentDidMount:function() {
        // 你就假设这儿有一个ajax请求吧
        this.setState({
            ajaxData:this.getData()
        });
    },
    getData:function() {
        return [
            {id:1,name:"张三",phone:"13312341234", prov:"北京", role:"管理员"},
            {id:3,name:"李四",phone:"18912341234", prov:"四川", role:"超级管理员"},
            {id:2,name:"王五",phone:"13512341234", prov:"杭州", role:"编辑"}
        ];
    },
    sortData:function() {
        var array = Array.prototype.slice.call(this.state.data);
        array.sort(function(a, b) {
            return a.id - b.id;
        });
        this.setState({
            data:array
        });
    },
    tableDelete:function(data) {
        RUI.DialogManager.alert(JSON.stringify(data));
    },
    fieldFormat:function(data, source) {
        return source.name + ' ' + (data+"").replace(/(\d{3})(\d{4})(\d{4})/g, function(match, a1, a2, a3) {
            return a1 + '-' + a2 + '-' + a3;
        });
    },
    render:function() {
        var sourceData = this.state.data;

        return <div className="example-input">
            <h2 className="title">表格<span>Table</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">默认表格</h4>
                <div>
                    <RUI.Table dataSource={sourceData} />
                </div>
                <h4 className="final-title">动态渲染</h4>
                <div>
                    <RUI.Table dataSource={this.state.ajaxData} />
                </div>
                <h4 className="final-title">自定义标题格</h4>
                <div>
                    <RUI.Table dataSource={sourceData}>
                        <RUI.Column dataField={"id"}>
                            <RUI.Table.TitleRender>
                                <a onClick={this.sortData}>序号(点击后排序)</a>
                            </RUI.Table.TitleRender>
                        </RUI.Column>
                        <RUI.Column title={"用户名"} dataField={"name"} />
                        <RUI.Column title={"手机号"} dataField={"phone"} fieldFunction={this.fieldFormat} />
                        <RUI.Column title={"省份"} dataField={"prov"} />
                        <RUI.Column title={"角色"} dataField={"role"} />
                    </RUI.Table>
                </div>
                <h4 className="final-title">自定义单元格</h4>
                <div>
                    <RUI.Table dataSource={sourceData}>
                        <RUI.Column checkbox={true}>
                            <RUI.Table.TitleRender>
                                <RUI.Checkbox selected={0} />
                            </RUI.Table.TitleRender>
                            <RUI.Table.ItemRender>
                                <RUI.Checkbox selected={0} />
                            </RUI.Table.ItemRender>
                        </RUI.Column>
                        <RUI.Column title={"用户名"} dataField={"name"}/>
                        <RUI.Column title={"手机号"} dataField={"phone"} />
                        <RUI.Column title={"省份"} dataField={"prov"} />
                        <RUI.Column title={"角色"} dataField={"role"} />
                        <RUI.Column title={"操作"}>
                            <RUI.Table.ItemRender>
                                <RUI.Button onClick={this.tableDelete}>删除</RUI.Button>
                            </RUI.Table.ItemRender>
                        </RUI.Column>
                    </RUI.Table>
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./table.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;