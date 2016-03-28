var Example = React.createClass({
    valueChange:function(e) {
        RUI.DialogManager.alert(JSON.stringify(e.data));
    },
    groupChange:function(e) {
        RUI.DialogManager.alert(JSON.stringify(e.data));
    },
    render:function() {
        return <div className="example-input">
            <h2 className="title">单选框<span>Radio</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">单个按钮</h4>
                <div>
                    <RUI.Radio value="type_1" selected={1} onChange={this.valueChange}>初始已选</RUI.Radio>
                    <RUI.Radio value="type_2" selected={0}>初始未选</RUI.Radio>
                    <RUI.Radio value="type_3" selected={0} disable={true}>禁用状态</RUI.Radio>
                </div>
                <h4 className="final-title">组</h4>
                <div>
                    <RUI.RadioGroup ref="radioGroup" onChange={this.groupChange} value={"type_1"}>
                        <RUI.Radio value="type_1">初始已选</RUI.Radio>
                        <RUI.Radio value="type_2">初始未选</RUI.Radio>
                        <RUI.Radio value="type_3">分组测试</RUI.Radio>
                        <RUI.Radio value="type_4" disable={true}>禁用状态</RUI.Radio>
                    </RUI.RadioGroup>
                </div>
                <h4 className="final-title">自定义</h4>
                <div>
                    <RUI.RadioGroup onChange={this.groupChange} value={"type_1"}>
                        <RUI.Radio.ItemRender value="custom_1"><RUI.Button>初始已选</RUI.Button></RUI.Radio.ItemRender>
                        <RUI.Radio.ItemRender value="custom_1"><RUI.Button>初始未选</RUI.Button></RUI.Radio.ItemRender>
                        <RUI.Radio.ItemRender value="custom_1"><RUI.Button>分组测试</RUI.Button></RUI.Radio.ItemRender>
                        <RUI.Radio.ItemRender value="custom_1"><RUI.Button>禁用状态</RUI.Button></RUI.Radio.ItemRender>
                    </RUI.RadioGroup>
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./radio.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;