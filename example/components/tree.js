var Example = React.createClass({
    getData:function() {
        return [
            {
                data:"root1",
                children:[
                    {
                        data:"sub-root-1",
                        children:[
                            {
                                data:"1-1-1"
                            },
                            {
                                data:"1-1-2"
                            },
                            {
                                data:"1-1-3"
                            }
                        ]
                    },
                    {
                        data:"sub-root-2",
                        children:[
                            {
                                data:"1-2-1"
                            },
                            {
                                data:"1-2-2"
                            },
                            {
                                data:"1-2-3"
                            }
                        ]
                    }
                ]
            },
            {
                data:"root2",
                children:[
                    {
                        data:"sub-root-1"
                    }
                ]
            }
        ];
    },
    render:function() {
        var initData = this.getData();

        return <div className="example-tree">
            <h2 className="title">树形菜单<span>Tree</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">初始数据</h4>
                <RUI.Tree dataSource={initData} />
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./tree.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;