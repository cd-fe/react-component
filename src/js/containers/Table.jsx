/**
 * 表格组件
 * @module containers/Table
 *
 * @see 表格列组件 {@link module:containers/table/Column}
 * @see 单元格组件 {@link module:containers/table/ItemRender}
 * @see 标题栏单元格组件 {@link module:containers/table/TitleRender}
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Column from './table/Column.jsx';
import Header from './table/Header.jsx';
import clone from '../util/clone.jsx';

import '../../css/table.scss';

var Table = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            dataSource:this.props.dataSource,
            itemHeight:this.props.itemHeight || 32
        };
    },
    getDefaultProps:function() {
        return {
            /**
             * @instance
             * @default table
             * @type string
             * @desc 组件名称
             */
            cname:'table',
            /**
             * @instance
             * @default null
             * @type number
             * @desc 固定高度值，如果设置，则启用滚动条模式
             */
            height:null,
            /**
             * @instance
             * @default 38
             * @type number
             * @desc 表格头部分单元格高度
             */
            titleHeight:48,
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否显示表格头
             */
            showTitle:true,
            /**
             * @instance
             * @default null
             * @type number
             * @desc 内容单元格高度
             */
            itemHeight:null,
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 内容单元格是否居中显示
             */
            itemMiddle:true,
            /**
             * @member
             * @instance
             * @param keys
             * @returns {*}
             * @type function
             * @default function(keys) {return keys;}
             * @desc 数据过滤函数
             * @example
             * columnsFilter:function(keys) {
             *      // keys => 单个数据的key值集合
             *      return ['id', 'name', 'phone'];
             * }
             */
            columnsFilter:function(keys) {
                return keys;
            },
            /**
             * @instance
             * @default []
             * @type array
             * @desc 表格数据
             * @example
             * dataSource = [
             *     {id;1, name:'Athas', phone:'13312341234', male:1, role:'manager'},
             *     {id;2, name:'Jobs', phone:'18934525552', male:0, role:'developer'},
             *     {id;3, name:'Tom', phone:'18366769899', male:0, role:'tester'},
             * ];
             */
            dataSource: [],
            odd: false,
            whiteSpace: false
        };
    },
    componentDidMount:function() {
        this.forceUpdate();
    },
    componentWillReceiveProps:function(newProps) {
        if(newProps && typeof newProps.dataSource != 'undefined') {
            this.setState({
                dataSource:newProps.dataSource
            });
        }
    },
    render:function() {
        var _this = this;
        var classes = className(this.props.className, this.getPropClass());
        classes += " clearfix";
        if(this.props.odd) {
            classes += ' odd';
        }
        if(this.props.whiteSpace) {
            classes += ' wrap';
        }else {
            classes += ' nowrap';
        }

        var keys = this.props.dataSource && this.props.dataSource.length ? this.props.columnsFilter(Object.keys(this.props.dataSource[0])) : [];

        var children = this.props.children ? React.Children.map(this.props.children, function(column, index) {
            var styles = column.props.style ? column.props.style : {};
            var props = clone(column.props);
            props.style = styles;
            props.source = this.props.dataSource;
            props.key = index;
            props.ref = "column" + index;
            props.titleHeight = this.props.titleHeight;
            props.itemHeight = this.state.itemHeight;
            props.itemMiddle = this.props.itemMiddle;
            return React.cloneElement(column, props);
        }.bind(this)) : (keys.map(function(key, index, all) {
            return <Column
                titleHeight={this.props.titleHeight}
                itemHeight={this.state.itemHeight}
                source={this.props.dataSource}
                title={key}
                dataField={key}
                key={index}
                ref={"column"+index}
                itemMiddle={this.props.itemMiddle}
            />;
        }.bind(this)));

        var scrollerStyles = {};
        if(this.props.height !== null) {
            scrollerStyles.height = this.props.height;
            scrollerStyles.minHeight = this.props.height;
            scrollerStyles.overflowY = 'hidden';
        }

        var renderItems = <table className="rui-table-content">
            {this.props.showTitle && <Header columns={children} />}
            {(this.state.dataSource && this.state.dataSource && this.refs['column0']) ? (
                <tbody>
                    {
                        this.state.dataSource.map(function(item, index) {
                            return <tr className="rui-table-row" key={index}>
                                {children.map(function(column, key) {
                                    var instance = _this.refs[column.ref];
                                    return instance.renderItem(item, index, key);
                                })}
                            </tr>;
                        })
                    }
                </tbody>
            ) : this.props.noDataRender}
        </table>;

        return <div {...this.props} className={classes}>
            <div className="rui-table-scroller" style={scrollerStyles}>
                {scrollerStyles.height ? <RUI.ScrollView>
                    {renderItems}
                </RUI.ScrollView> : renderItems}
            </div>
            {children}
        </div>;
    }
});

Table.TitleRender = require('./table/TitleRender.jsx');
Table.ItemRender = require('./table/ItemRender.jsx');

module.exports = Table;