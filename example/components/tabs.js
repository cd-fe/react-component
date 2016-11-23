/**
 * Created by CoolGuy on 2016/11/23 10:53.
 */
var Tabs = React.createClass({
    getInitialState(){
        return {
            tab:[{ title: 'Tab 1', content: <div>Hello<span>World</span></div>},
                { title: 'Tab 2', content: 'Content of Tab 2'},
                { title: 'Tab 3', content: 'Content of Tab 3'},
                /*{ title: 'Tab 4', content: 'Content of Tab 4'},
                { title: 'Tab 5', content: 'Content of Tab 5'},*/
            ],
            selected:1
        }
    },
    tabClick(){
      console.log(arguments);
    },
    onAdd(){
        this.setState({
            tab:[...this.state.tab,{title:"Hello",content:"I am New!"}]
        })
    },
    onRemove(pane,index){
        let tab = this.state.tab;
        tab.splice(index,1);
        let len = tab.length;
        console.log(len);
        this.setState({
            tab:tab,
            selected:len-1
        })
    },
    render(){
        return (
            <div>
                <div>这是个DEMO</div>
                <RUI.Tab
                         selected={this.state.selected}
                         defaultSelected={2}
                         onChange={this.tabClick}
                         onRemove={this.onRemove}
                         onAdd={this.onAdd}
                         type="normal">
                    { this.state.tab.map((v,i)=>{
                        return <RUI.TabPane key={i} title={v.title}></RUI.TabPane>
                    })}
                </RUI.Tab>
                <div>这是另一个demo</div>
                <RUI.Tab>
                    <RUI.TabPane title="标题1">我是第一个标签</RUI.TabPane>
                    <RUI.TabPane title="标题2">我是第2个标签</RUI.TabPane>
                    <RUI.TabPane title="标题3">我是第3个标签</RUI.TabPane>
                </RUI.Tab>

                <div>abcdef</div>
            </div>
        )
    }
});
module.exports = Tabs;