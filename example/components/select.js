var Example = React.createClass({
    getInitialState: function () {
        return {
            selected :{key:'查看2222',value:'1'},
            data: [{key:'查看',value:'1'}]
        };
    },
    filterHandle : function() {
        return [];
    },
    onClickHandler:function(e) {
        this.setState({
            selected : {key:'查看6',value:'3'},
            data : [
                {key:'查看1',value:'1'},
                {key:'查看2',value:'2'},
                {key:'查看3',value:'3'},
                {key:'查看4',value:'3'},
                {key:'查看5',value:'3'},
                {key:'查看6',value:'3'}
            ]
        });
    },
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
                        maxLen="11"
                        result="暂无相关信息"
                        className="rui-theme-3"
                        stuff={true}
                        filterCallback={this.filterHandle}>
                    </RUI.Select>
                </div>

                <h4 className="final-title">选项只有一个</h4>
                <div>
                    <RUI.Select
                        data={this.state.data}
                        value={this.state.selected}
                        stuff={true}
                        offset={'0'}
                        callback={this.selectCallback}
                        className="rui-theme-2 short">
                    </RUI.Select>
                    &nbsp;&nbsp;
                    <RUI.Button onClick={this.onClickHandler}>点击</RUI.Button>
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