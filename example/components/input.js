var Example = React.createClass({
    getInitialState:function() {
        return {
            init:"在这儿显示初始字符"
        }
    },
    onInputChange:function(e) {
        RUI.DialogManager.alert("change:" + e.target.value, "提示");
    },
    onEnterHandler:function(e) {
        RUI.DialogManager.alert('enter') ;
    },
    customMaxLength:function(val) {
        if(!val) {
            return 140;
        }
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null)
            {
                len += 2;
            }
            else
            {
                len += 1;
            }
        }
        return Math.max(0, 140 - len);
    },
    render:function() {
        return <div className="example-input">
            <h2 className="title">输入框<span>Input</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">输入框</h4>
                <div>
                    <RUI.Input value={this.state.init} onChange={this.onInputChange} /><br/>
                    <RUI.Input mode="static" value={"不可修改"}/><br/>
                    <RUI.Input className="medium" placeholder="保留正常结点属性"/><br/>
                    <RUI.Input grid={24} onEnter={this.onEnterHandler} />
                </div>
                <h4 className="final-title">文本域</h4>
                <div>
                    <RUI.Textarea value={this.state.init} resize={true} />
                </div>
                <h4 className="final-title">字数提示</h4>
                <div>
                    <RUI.Textarea maxLength={140} resize={true} />
                </div>
                <h4 className="final-title">自定义字数提示规则</h4>
                <div>
                    <RUI.Textarea maxLength={140} maxLengthHandler={this.customMaxLength} placeholder="一个汉字算两个字符" />
                </div>
                <h4 className="final-title">根据内容自动缩放</h4>
                <div>
                    <RUI.Textarea autoSize={true} value="// JUST TODO" />
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./input.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;