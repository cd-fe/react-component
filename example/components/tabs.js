/**
 * Created by CoolGuy on 2016/11/23 10:53.
 */
var Tabs = React.createClass({
    getInitialState(){
        return {
            tab:[{ title: 'Tab 1', content: <div>Hello<span>World</span></div>},
                { title: 'Tab 2', content: 'Content of Tab 2'},
                { title: 'Tab 3', content: 'Content of Tab 3'},
                { title: 'Tab 4', content: 'Content of Tab 4'},
                { title: 'Tab 5', content: 'Content of Tab 5'},
            ],
            selected:1,
            output:"目前没有",
            shouldShowXOnlyOnePane:true,
            maxPaneLength:10
        }
    },
    tabClick(which){
        this.setState({output:"刚才点击了："+which.index});
    },
    onAdd(){
        this.setState({
            tab:[...this.state.tab,{title:"Hello",content:"I am New!"}],
            output:'新增了一项'
        })
    },
    onRemove({pane,index}){
        let tab = this.state.tab;
        tab.splice(index,1);
        let len = tab.length || 1;//至少应该为1
        console.log(len);
        this.setState({
            tab:tab,
            output:`删掉了下标是${index}的项`
        })
    },
    render(){
        return (
            <div className="example-slider">
                <h2 className="title">tab标签<span>tab</span></h2>
                <h3 className="sub-title">演示</h3>
                <div className="example">
                    <div>一些输出内容：{this.state.output}</div>
                    <h4 className="final-title">完整功能演示(type="editable-card")</h4>
                    <div>Tab只剩下一项时是否可以删除?
                        <RUI.RadioGroup ref="radioGroup" onChange={(e)=>{this.setState({shouldShowXOnlyOnePane:e.data=='type_1'})}} defaultValue={"type_1"}>
                            <RUI.Radio value="type_1">可以</RUI.Radio>
                            <RUI.Radio value="type_2">不可</RUI.Radio>
                        </RUI.RadioGroup>
                    </div>
                    <div>
                        可以添加的最大长度是:(不填写或0表示不限制):
                        <RUI.Input value={this.state.maxPaneLength} onChange={(e)=>this.setState({maxPaneLength:e.target.value})}/>
                    </div>
                    <RUI.Tab
                        defaultSelected={2}
                        onChange={this.tabClick}
                        onRemove={this.onRemove}
                        onAdd={this.onAdd}
                        shouldShowXOnlyOnePane={this.state.shouldShowXOnlyOnePane}
                        maxPaneLength={this.state.maxPaneLength}
                        type="editable-card">
                        { this.state.tab.map((v,i)=>{
                            return <RUI.TabPane key={i} title={v.title}>{v.content}</RUI.TabPane>
                        })}
                    </RUI.Tab>
                    <h4 className="final-title">type="card"</h4>
                    <RUI.Tab
                        type="card"
                    >
                        <RUI.TabPane title="标题1">我是第一个标签</RUI.TabPane>
                        <RUI.TabPane title="标题2">我是第2个标签</RUI.TabPane>
                        <RUI.TabPane title="标题3">我是第3个标签</RUI.TabPane>
                    </RUI.Tab>
                    <h4 className="final-title">type="line"(默认样式), 允许自定义class(此处定义了没有任何样式的class)</h4>
                    <RUI.Tab
                        type="line"
                        wrapperClass="my-class-do-nothing"
                        headerClass="my-header-class-do-nothing"
                        tabClass="my-tab-class-do-nothing"
                    >
                        <RUI.TabPane title="标题1">我是第一个标签</RUI.TabPane>
                        <RUI.TabPane title="标题2">我是第2个标签</RUI.TabPane>
                        <RUI.TabPane title="标题3">我是第3个标签</RUI.TabPane>
                    </RUI.Tab>
                    <h4 className="final-title">type="normal"</h4>
                    <RUI.Tab
                        type="normal"
                        onChange={this.tabClick}
                    >
                        <RUI.TabPane title="标题1"></RUI.TabPane>
                        <RUI.TabPane title="标题2"></RUI.TabPane>
                        <RUI.TabPane title="标题3"></RUI.TabPane>
                    </RUI.Tab>
                </div>




            </div>
        )
    }
});
module.exports = Tabs;