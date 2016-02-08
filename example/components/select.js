var Example = React.createClass({
    render:function() {
        return <div className="example-input">
            <h2 className="title">下拉选框<span>Select</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">默认</h4>
                <div>
                    <RUI.Select
                        data={[{key:'查看',value:'1'}, {key:'编辑',value:'2'}, {key:'删除',value:'3'}]}
                        value={{key:'查看',value:'1'}}
                        stuff={true}
                        event={'click'}
                        className="rui-theme-1">
                    </RUI.Select>
                </div>
                <h4 className="final-title">另外一种样式</h4>
                <div>
                    <RUI.Select
                        ref="selectBody"
                        data={[{key:'查看',value:'1'},{key:'你好',value:'2'}]}
                        value={{key:'查看',value:'1'}}
                        className="rui-theme-3"
                        stuff={true}
                        callback={this.selectCallback}>
                    </RUI.Select>
                </div>
                <h4 className="final-title">带搜索框</h4>
                <div>
                    <RUI.Select
                        data={[{key:'查看',value:'1'}, {key:'a',value:'1'}, {key:'aa',value:'1'}, {key:'b',value:'1'}, {key:'bba',value:'1'}]}
                        value={{key:'查看',value:'1'}}
                        filter={true}
                        className="rui-theme-3"
                        stuff={true}
                        filterCallback={this.filterHandle}>
                    </RUI.Select>
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./select.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;