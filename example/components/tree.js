var Example = React.createClass({
    getData:function() {
        return [
            {
                data:"Post",
                children:[
                    {data:"All Post", children:[{data:"All"}, {data:"Published"}, {data:"Draft"}]},
                    {data:"Add New"},
                    {data:"Categories", children:[{data:"List"}, {data:"Add New"}]},
                    {data:"Tags", children:[{data:"List"}, {data:"Add New"}]}
                ]
            },
            {
                data:"Media",
                children:[
                    {data:"Library"},
                    {data:"Add New"}
                ]
            },
            {
                data:"Appearance",
                children:[
                    {data:"Themes"},
                    {data:"Theme Options"},
                    {data:"Customize"},
                    {data:"Widgets"},
                    {data:"Menus"},
                    {data:"Editor"}
                ]
            },
            {
                data:"Settings",
                children:[
                    {data:"General", children:[{data:"Site Title"}, {data:"Tagline"}, {data:"Site Address"}, {data:"Timezone"}]},
                    {data:"Writing"},
                    {data:"Reading"},
                    {data:"Media"},
                    {data:"Permalinks"}
                ]
            }
        ];
    },
    getDataSource:function() {
        if(!this.dataSource) {
            this.dataSource = new RUI.DataSource();
        }
        return this.dataSource;
    },
    changeHandler:function(event) {
        RUI.DialogManager.alert(JSON.stringify({
            type:event.type,
            dataSource:event.data.dataSource,
            expand:event.data.expand
        }));
    },
    clickHandler:function(event) {
        RUI.DialogManager.alert(JSON.stringify({
            type:event.type,
            dataSource:event.data.dataSource
        }));
    },
    render:function() {
        var initData = this.getData();

        return <div className="example-tree">
            <h2 className="title">树形菜单<span>Tree</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">初始数据</h4>
                <RUI.Tree dataSource={initData} />
                <h4 className="final-title">事件</h4>
                <RUI.Tree dataSource={initData} onExpand={this.changeHandler} onSelect={this.clickHandler}/>
                <h4 className="final-title">异步数据</h4>
                <RUI.Tree dataSource={this.getDataSource()} />
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./tree.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;