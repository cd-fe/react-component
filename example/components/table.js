var CheckboxItemRender = React.createClass({
    getInitialState:function() {
        return {
            selected:this.props.selected || 0
        };
    },
    componentWillReceiveProps:function(nextProps) {
        if(typeof nextProps.selected != 'undefined') {
            this.setState({
                selected:!!nextProps.selected
            });
        }
    },
    setData:function(data, field) {
        this.setState(data);
    },
    changeHandler:function() {
        this.props.onClick && this.props.onClick(this.state);
    },
    render:function() {
        return <RUI.Checkbox selected={this.state.selected} onChange={this.changeHandler} />
    }
});

var OperationItemRender = React.createClass({
    setData:function(data) {
        this.setState(data);
    },
    clickHandler:function() {
        this.props.onClick && this.props.onClick(this.state);
    },
    render:function() {
        return <RUI.Button onClick={this.clickHandler}>{this.props.children}</RUI.Button>;
    }
});

var SortTitleRender = React.createClass({
    setData:function(data) {
        this.setState(data);
    },
    render:function() {
        return <a {...this.props}>序号(点击后排序)</a>;
    }
});

var Example = React.createClass({
    getInitialState:function() {
        return {
            ajaxData:[],
            data:this.getData().map(function(item) {
                item.selected = true;
                return item;
            })
        };
    },
    componentDidMount:function() {
        // 你就假设这儿有一个ajax请求吧
        this.setState({
            ajaxData:this.state.data
        });
    },
    columnsFilter:function(keys) {
        var index = keys.findIndex(function(item) {
            return item == 'selected';
        });
        if(index > -1) {
            keys.splice(index, 1);
        }
        return keys;
    },
    getData:function() {
        return [
            {id:1,name:"张三",phone:"13312341234", prov:"北京", role:"管理员", desc:{tag:'影视 娱乐'}},
            {id:3,name:"李四",phone:"18912341234", prov:"四川", role:"超级管理员", desc:{tag:'IT 编程'}},
            {id:2,name:"王五",phone:"13512341234", prov:"杭州", role:"编辑", desc:{tag:'数码 科技'}}
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
        return (data+"").replace(/(\d{3})(\d{4})(\d{4})/g, function(match, a1, a2, a3) {
            return a1 + '-' + a2 + '-' + a3;
        });
    },
    allCheck:function() {
        var isAllCheck = this.isAllCheck();
        this.setState({
            data:this.state.data.map(function(item) {
                item.selected = isAllCheck ? false : true;
                return item;
            })
        });
    },
    isAllCheck:function() {
        return !this.state.data.some(function(item) {
            return !item.selected;
        });
    },
    checkItem:function(data) {
        this.setState({
            data:this.state.data.map(function(item) {
                if(item.id == data.id) {
                    item.selected = !item.selected;
                }
                return item;
            })
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
                    <RUI.Table dataSource={sourceData}/>
                </div>
                <h4 className="final-title">动态渲染-过滤列名</h4>
                <div>
                    <RUI.Table dataSource={this.state.ajaxData} columnsFilter={this.columnsFilter} />
                </div>
                <h4 className="final-title">自定义标题格</h4>
                <div>
                    <RUI.Table dataSource={sourceData}>
                        <RUI.Column dataField={"id"}>
                            <RUI.Table.TitleRender>
                                <SortTitleRender onClick={this.sortData} />
                            </RUI.Table.TitleRender>
                        </RUI.Column>
                        <RUI.Column title={"用户名"} dataField={"name"} />
                        <RUI.Column title={"手机号"} dataField={"phone"} fieldFunction={this.fieldFormat} />
                        <RUI.Column title={"省份"} dataField={"prov"} />
                        <RUI.Column title={"描述标签"} dataField={"desc.tag"} />
                        <RUI.Column title={"角色"} dataField={"role"} />
                    </RUI.Table>
                </div>
                <h4 className="final-title">自定义单元格</h4>
                <div>
                    <RUI.Table dataSource={sourceData}>
                        <RUI.Column>
                            <RUI.Table.TitleRender>
                                <CheckboxItemRender onClick={this.allCheck} selected={this.isAllCheck()} />
                            </RUI.Table.TitleRender>
                            <RUI.Table.ItemRender>
                                <CheckboxItemRender onClick={this.checkItem} />
                            </RUI.Table.ItemRender>
                        </RUI.Column>
                        <RUI.Column title={"用户名"} dataField={"name"}/>
                        <RUI.Column title={"手机号"} dataField={"phone"} />
                        <RUI.Column title={"省份"} dataField={"prov"} />
                        <RUI.Column title={"角色"} dataField={"role"} />
                        <RUI.Column title={"操作"}>
                            <RUI.Table.ItemRender>
                                <OperationItemRender onClick={this.tableDelete}>删除</OperationItemRender>
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