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
             * @default line
             * @type string
             * @desc tab的显示类型，可选值请参考getTheme方法，默认是line
             */
            type: 'line',
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 对于type=editable-card时，如果只有一个元素时，是否显示X（close图标）
             */
            shouldShowXOnlyOnePane:false,
            /**
             * @instance
             * @default 0
             * @type number
             * @desc 最大允许的tab子项的长度，0表示不限制
             */
            maxPaneLength:0
        };
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.selected !== undefined && nextProps.selected !== this.state.selected) {
            //console.log(nextProps);
            this.setState({
                selected: nextProps.selected
            })
        }
    },
    onRemove(pane,index,e){
        e.stopPropagation();
        let tabPaneLength = this.getTabPaneLength();
        let selected = this.state.selected;
        //console.log(tabPaneLength,selected);
        if(selected >= tabPaneLength - 1){
            selected = tabPaneLength - 2;
            this.setState({
                selected:selected > 0 ? selected : 0
            },()=>{
                this.props.onRemove ? this.props.onRemove({pane,index}) : console.warn("You didn't have a onRemove prop");
            })
        }else{
            this.props.onRemove ? this.props.onRemove({pane,index}) : console.warn("You didn't have a onRemove prop");
        }

    },
    onAdd(){
        //console.log("added");
        this.props.onAdd ? this.props.onAdd() : console.warn("You didn't have a onAdd prop");
    },
    tabSelect(pane,index){
        this.setState({
            selected: index
        },()=>{
            this.props.onChange && this.props.onChange({pane,index});
        });
    },
    getTabPaneLength(){
        let children = this.props.children;
        let length = 0;
        if(!children){
            return length;
        }
        children.map((v,i)=>{
            //只有TabPane组件需要被处理
            if(v.props && v.props.cname == "tab-pane"){
                length++;
            }
        });
        return length;

    },
    shouldXShown(){
        if(this.getTheme() === 'editable-card'){
            if(this.getTabPaneLength() === 1 && !this.props.shouldShowXOnlyOnePane){
                return false;
            }
            return true;
        }
        return false;
    },
    shouldAddShown(){
        if(this.getTheme() === 'editable-card') {
            if(this.props.maxPaneLength && this.getTabPaneLength() >= this.props.maxPaneLength){
                return false;
            }
            return true;
        }
        return false;
    },
    renderOneHeader(pane,index){
        let {title} = pane;//tab的标题名字
        let selected = (index) == this.state.selected;
        //默认不展示
        let spanClass = selected && "active";
        spanClass = className("span-btn",spanClass);
        this.props.tabClass && (spanClass = className(spanClass,this.props.tabClass));
        //目前只有editable-card需要显示icon-close
        let showClose = this.shouldXShown();
        return (
            <span key={index} className={spanClass} onClick={this.tabSelect.bind(this,pane,index)}>
                {title}
                {showClose && <RUI.Icon className="close-icon" name="close" onClick={this.onRemove.bind(this,pane,index)}></RUI.Icon>}
            </span>
        )

    },

    renderHeader(){
        let children = this.props.children;
        if(!children){
            return null;
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
        let spanClass = selected ? "active" : "dp-n";//className("dp-n",selected && "active");
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
            return null;
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
    getTheme(theme = this.props.type){
        let themes = ["line","scroll-line","card","editable-card","standard","normal"];
        if(~themes.indexOf(theme)){
            return theme;
        }
        theme && console.warn("Your theme is not supported:",theme,",default theme is rendered.");
        return themes[0];
    },
    renderNormalThemeHeader(){
        let children = this.props.children;
        if(!children){
            return null;
        }

        let rendered = [];
        children.map((v,i)=>{
            //只有TabPane组件需要被处理
            if(v.props && v.props.cname == "tab-pane"){
                let selected = (i) == this.state.selected;
                //默认不展示
                let spanClass = selected && " primary tab-mark";
                spanClass = className("m-r10",spanClass);
                this.props.tabClass && (spanClass = className(spanClass,this.props.tabClass));
                rendered.push(
                    <RUI.Button key={i} className={spanClass}  onClick={this.tabSelect.bind(this,v.props,i)}>{v.props.title}</RUI.Button>
                );
            }
        });
        return rendered;
    },
    render(){
        let theme = this.getTheme();
        let wrapperClass = className("tab-wrapper",theme);
        this.props.wrapperClass && (wrapperClass = className(wrapperClass,this.props.wrapperClass));
        let headerClass = "header-span";
        this.props.headerClass && (headerClass = className(headerClass,this.props.headerClass));

        let shouldShowAdd = this.shouldAddShown();
        return (

            <div className="rui-tab">
                <div ref="tab-wrapper" className={wrapperClass}>
                    <div ref="tabs" className={headerClass}>
                        {
                            theme==="normal" ? this.renderNormalThemeHeader() :this.renderHeader()
                        }
                    </div>
                    {shouldShowAdd &&<RUI.Icon name="upload-add" className="add-icon" onClick={this.onAdd}></RUI.Icon>}
                </div>
                {this.renderContent()}
            </div>
        )
    }
});

module.exports = Tab;