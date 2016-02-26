import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';
import TitleRender from './TitleRender.jsx';
import ItemRender from './ItemRender.jsx';
import ItemRenderDefault from './ItemRenderDefault.jsx';
import merge from '../../util/merge.jsx';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {};
    },
    getDefaultProps:function() {
        return {
            cname:'table-column'
        };
    },
    findExistRender:function(cname) {
        var render = null;
        if(this.props.children) {
            var children = this.props.children instanceof Array ? this.props.children : [this.props.children];
            var exist = children.find(function(child) {
                return child.props.cname == cname;
            });
            if(exist) {
                render = exist.props.children;
            }
        }
        return render;
    },
    getDefaultTitleRender:function() {
        var render = this.findExistRender('table-title-render');
        if(!render) {
            render = <ItemRenderDefault className={"rui-table-title"} value={this.props.title || this.props.dataField}/>;
        }else {
            render = <ItemRenderDefault className={"rui-table-title"}>{render}</ItemRenderDefault>;
        }
        return render;
    },
    getDefaultItemRender:function() {
        var render = this.findExistRender('table-item-render');
        if(!render) {
            render = <ItemRenderDefault />;
        }else {
            render = <ItemRenderDefault>{render}</ItemRenderDefault>
        }
        return render;
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());

        var DefaultRenderClass = this.getDefaultItemRender();
        var DefaultRenderClassProps = DefaultRenderClass.props;
        var dataField = this.props.dataField;
        var _this = this;
        return <ul {...this.props} className={classes}>
            {this.getDefaultTitleRender()}
            {this.props.source && this.props.source.map(function(item, index) {
                return React.cloneElement(DefaultRenderClass, merge({
                    value:item[dataField],
                    source:item,
                    key:index,
                    fieldFunction:_this.props.fieldFunction
                }, DefaultRenderClassProps));
            })}
        </ul>;
    }
});