/**
 * 表格列组件
 * @module containers/table/Column
 */

import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';
import TitleRender from './TitleRender.jsx';
import ItemRender from './ItemRender.jsx';
import ItemRenderDefault from './ItemRenderDefault.jsx';
import merge from '../../util/merge.jsx';

var Column = module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
    getInitialState:function() {
        return {};
    },
    getDefaultProps:function() {
        return {
            /**
             * @instance
             * @default table-column
             * @type string
             * @desc 组件名称
             */
            cname:'table-column',
            /**
             * @instance
             * @default null
             * @type string
             * @desc 标题头显示内容
             */
            title: null,
            /**
             * @instance
             * @default null
             * @type string
             * @desc 内容单元格显示的字段内容
             */
            dataField: null,
            titleClassName: ""
        };
    },
    getDefaultTitleRender:function() {
        var render = Column.findExistRender('table-title', this.props.children).render;
        if(!render) {
            render = <ItemRenderDefault label={this.props.title || this.props.dataField} style={{height:this.props.titleHeight}} />;
        }
        return render;
    },
    getDefaultItemRender:function() {
        var result = Column.findExistRender('table-column-item', this.props.children);
        var render = result.render;
        if(!render) {
            render = <ItemRenderDefault />;
        }
        return {
            item:result.item,
            render:render
        };
    },
    renderItem:function(data, index, key) {
        var _this = this;
        var DefaultRenderClass = this.getDefaultItemRender();
        //var DefaultRenderClassProps = DefaultRenderClass.props;
        var ItemRenderProps = DefaultRenderClass.item ? DefaultRenderClass.item.props : {};
        var DefaultRenderClassProps = DefaultRenderClass.render ? DefaultRenderClass.render.props : {};
        var classes = className((this.props.className||"") + " " + (ItemRenderProps.className+""), this.getPropClass());
        var _this = this;
        return <ItemRender {...ItemRenderProps} className={classes} style={{height:_this.props.itemHeight}} key={key}>{React.cloneElement(DefaultRenderClass.render, merge({
            fieldFunction:_this.props.fieldFunction,
            itemHeight:_this.props.itemMiddle ? _this.props.itemHeight + 'px' : null,
            data:data,
            index:index,
            field:_this.props.dataField
        }, DefaultRenderClassProps))}</ItemRender>;
    },
    render:function() {
        return <div />;
        //var classes = className(this.props.className, this.getPropClass());
        //
        //var DefaultRenderClass = this.getDefaultItemRender();
        //var DefaultRenderClassProps = DefaultRenderClass.props;
        //var _this = this;
        //return <ul {...this.props} className={classes}>
        //    {/*<TitleRender>
        //        {this.getDefaultTitleRender()}
        //    </TitleRender>*/}
        //    {this.props.source && this.props.source.map(function(item, index) {
        //        return <ItemRender key={index} style={{height:_this.props.itemHeight}}>{React.cloneElement(DefaultRenderClass, merge({
        //            ref:index,
        //            fieldFunction:_this.props.fieldFunction,
        //            itemHeight:_this.props.itemMiddle ? _this.props.itemHeight + 'px' : null
        //        }, DefaultRenderClassProps))}</ItemRender>;
        //    })}
        //</ul>;
    }
});

Column.findExistRender = function(cname, childlist) {
    var exist = null;
    var render = null;
    if(childlist) {
        var children = childlist instanceof Array ? childlist : [childlist];
        exist = children.find(function(child) {
            return child.props.cname == cname;
        });
        if(exist) {
            render = exist.props.children;
        }
    }
    return {
        item:exist,
        render:render
    };
};