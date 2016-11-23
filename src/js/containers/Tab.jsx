/**
 * Created by CoolGuy on 2016/11/23 11:08.
 *
 */
import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import '../../css/tab.scss';

var Tab = React.createClass({
    mixins: [ComponentBase],
    getInitialState(){
        return {
            /**
             * @instance
             * @default 1
             * @type int
             * @desc 默认选中的tab项，0表示最前面一项
             */
            selected:this.props.defaultSelected || 0
        }
    },
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default tab
             * @type string
             * @desc 组件名称
             */
            cname: 'tab',
            /**
             * @instance
             * @default editable-card
             * @type string
             * @desc tab的显示类型，可选值是line、card和editable-card
             */
            type: 'editable-card',
        };
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.selected !== undefined && nextProps.selected !== this.state.selected) {
            console.log(nextProps);
            this.setState({
                selected: nextProps.selected
            })
        }
    },
    onRemove(pane,index,e){
        e.stopPropagation();
        //console.log(index);
        this.props.onRemove && this.props.onRemove(pane,index);

    },
    onAdd(){
        console.log("added");
        this.props.onAdd && this.props.onAdd();
    },
    tabSelect(pane,index){
        this.props.onChange && this.props.onChange(pane,index);
        this.setState({
            selected: index
        });
    },
    renderOneHeader(pane,index){
        let {title} = pane;//tab的标题名字
        let selected = (index) == this.state.selected;
        //默认不展示
        let spanClass = className("dp-n",selected && "active");
        spanClass = className("span-btn",spanClass);
        return (
            <span key={index} className={spanClass} onClick={this.tabSelect.bind(this,pane,index)}>
                {title}
                <i className="close-icon" onClick={this.onRemove.bind(this,pane,index)}></i>
            </span>
        )

    },
    renderHeader(){
        let children = this.props.children;
        if(!children){
            return;
        }
        let rendered = [];
        children.map((v,i)=>{
            //只有TabPane组件需要被处理
            if(v.props && v.props.cname == "tab-pane"){
                rendered.push(this.renderOneHeader(v.props,i));
            }
        });
        return rendered;
    },
    renderOneContent(pane,index){
        let selected = (index) == this.state.selected;
        //默认不展示
        let spanClass = className("dp-n",selected && "active");
        spanClass = className("tab-content",spanClass);
        //console.log(index,this.state.selected);
        return (
            <div key={index} className={spanClass}>
                {pane.children}
            </div>
        )
    },
    renderContent(){
        let children = this.props.children;
        if(!children){
            return;
        }
        let rendered = [];
        children.map((v,i)=>{
            //只有TabPane组件需要被处理
            if(v.props && v.props.cname == "tab-pane"){
                rendered.push(this.renderOneContent(v.props,i));
            }else{
                rendered.push(v.children);
            }
        });
        return rendered;
    },
    render(){
        return (
            <div className="rui-tab">
                <div className="type-card">
                    <div className="header-span">
                        {this.renderHeader()}
                    </div>
                    <RUI.Icon name="upload-add" className="add-icon" onClick={this.onAdd}></RUI.Icon>
                </div>
                {this.renderContent()}
            </div>
        )
    }
});

module.exports = Tab;