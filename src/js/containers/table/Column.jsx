import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';
import TitleRender from './TitleRender.jsx';
import ItemRender from './ItemRender.jsx';
import ItemRenderDefault from './ItemRenderDefault.jsx';
import merge from '../../util/merge.jsx';

var Column = module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {};
    },
    getDefaultProps:function() {
        return {
            cname:'table-column'
        };
    },
    getDefaultTitleRender:function() {
        var render = Column.findExistRender('table-title', this.props.children);
        if(!render) {
            render = <ItemRenderDefault label={this.props.title || this.props.dataField} style={{height:this.props.titleHeight}} />;
        }
        return render;
    },
    getDefaultItemRender:function() {
        var render = Column.findExistRender('table-column-item', this.props.children);
        if(!render) {
            render = <ItemRenderDefault />;
        }
        return render;
    },
    componentDidMount:function() {
        this.childrenUpdate();
    },
    componentDidUpdate:function() {
        this.childrenUpdate();
    },
    childrenUpdate:function() {
        var dataField = this.props.dataField;
        Object.keys(this.refs).forEach(function(key, index) {
            var data = this.props.source[index];
            var child = this.refs[key];
            if(child.setData) {
                child.setData(data, dataField);
            }else {
                console.warn('ItemRender must to implement "setData" method.', child);
            }
        }.bind(this));
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());

        var DefaultRenderClass = this.getDefaultItemRender();
        var DefaultRenderClassProps = DefaultRenderClass.props;
        var _this = this;
        return <ul {...this.props} className={classes}>
            {/*<TitleRender>
                {this.getDefaultTitleRender()}
            </TitleRender>*/}
            {this.props.source && this.props.source.map(function(item, index) {
                return <ItemRender key={index} style={{height:_this.props.itemHeight}}>{React.cloneElement(DefaultRenderClass, merge({
                    ref:index,
                    fieldFunction:_this.props.fieldFunction,
                    itemHeight:_this.props.itemMiddle ? _this.props.itemHeight + 'px' : null
                }, DefaultRenderClassProps))}</ItemRender>;
            })}
        </ul>;
    }
});

Column.findExistRender = function(cname, childlist) {
    var render = null;
    if(childlist) {
        var children = childlist instanceof Array ? childlist : [childlist];
        var exist = children.find(function(child) {
            return child.props.cname == cname;
        });
        if(exist) {
            render = exist.props.children;
        }
    }
    return render;
};