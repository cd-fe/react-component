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
            componentWidth:0
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
            titleHeight:38,
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否显示表格头
             */
            showTitle:true,
            /**
             * @instance
             * @default 36
             * @type number
             * @desc 内容单元格高度
             */
            itemHeight:36,
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
            dataSource: []
        };
    },
    componentDidMount:function() {
        $(window).bind('resize', this.updateWidth);
        this.updateWidth();
    },
    componentWillUnmount:function() {
        $(window).unbind('resize', this.updateWidth);
    },
    componentDidUpdate:function() {
        setTimeout(this.updateItemHeight, 0);
    },
    updateWidth:function() {
        var _this = this;
        var node = $(ReactDOM.findDOMNode(this));
        // 先让父容器能够自适应宽度
        node.width('auto');
        var width = node.width();
        // 在某些父容器百分比设置的情况下，会出现小数点的宽度，与获取到的宽度不一致，导致布局异常，因此，获取是多少，就重新再设置一遍回去
        node.width(width);

        this.setState({
            componentWidth : width
        }, this.updateItemHeight);
    },
    updateItemHeight:function() {
        var _this = this;
        var node = $(ReactDOM.findDOMNode(this));
        var items = node.find('.rui-table-column-item');
        items.height('auto');
        items.find('span').css({
            display:'inline',
            marginTop:0
        });

        var map = [];
        items.map(function(index, item) {
            if($(item).height() > _this.props.itemHeight) {
                $(item).css('lineHeight', 'normal');
                $(item).find('span').css('lineHeight', 'normal');

                var height = $(item).height();
                console.log(height);
                map[index % _this.props.dataSource.length] = Math.max(height, map[index % _this.props.dataSource.length] || _this.props.itemHeight);
            }else {
                $(item).height(_this.props.itemHeight);
                $(item).css('lineHeight', _this.props.itemHeight + 'px');
            }
        });
        console.log(map);
        items.map(function(index, item) {
            var mod = index % _this.props.dataSource.length;
            if(map[mod]) {
                if($(item).height() != map[mod]) {
                    if($(item).height() != _this.props.itemHeight) {
                        $(item).find('span').css({
                            display:'block',
                            marginTop:(map[mod] - $(item).find('span').height())/2
                        });
                    }else {
                        $(item).css('lineHeight', map[mod] + 'px');
                    }
                }
                $(item).height(map[mod]);
            }
        });
    },
    percent:function(piece) {
        return (100 / piece).toFixed(8);
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        classes += " clearfix";

        if(!this.state.componentWidth) {
            return <div />;
        }
        var totalWidth = this.state.componentWidth;
        var totalAutoCount = 0;
        var keys = this.props.dataSource && this.props.dataSource.length ? this.props.columnsFilter(Object.keys(this.props.dataSource[0])) : [];
        if(this.props.children) {
            React.Children.map(this.props.children, function (child) {
                if (typeof child.props.width == 'undefined') {
                    totalAutoCount++;
                } else {
                    totalWidth -= parseInt(child.props.width, 10);
                }
            });
        }else {
            totalAutoCount = keys.length;
        }
        var itemWidth =totalAutoCount ? Math.floor(totalWidth / totalAutoCount) * 1 : 0;
        var children = this.props.children ? React.Children.map(this.props.children, function(column, index) {
            var styles = column.props.style ? column.props.style : {};
            if(typeof column.props.width == 'undefined') {
                styles.width = totalAutoCount > 1 ? itemWidth : totalWidth;
                totalWidth -= styles.width;
                totalAutoCount--;
            }else {
                styles.width = column.props.width;
            }
            var props = clone(column.props);
            props.style = styles;
            props.source = this.props.dataSource;
            props.key = index;
            props.titleHeight = this.props.titleHeight;
            props.itemHeight = this.props.itemHeight;
            props.itemMiddle = this.props.itemMiddle;
            return React.cloneElement(column, props);
        }.bind(this)) : (keys.map(function(key, index, all) {
            var width = totalAutoCount > 1 ? itemWidth : totalWidth;
            totalWidth -= width;
            totalAutoCount--;
            return <Column
                titleHeight={this.props.titleHeight}
                itemHeight={this.props.itemHeight}
                source={this.props.dataSource}
                title={key}
                dataField={key}
                key={index}
                itemMiddle={this.props.itemMiddle}
                style={{width:width}}
            />;
        }.bind(this)));

        var scrollerStyles = {};
        if(this.props.height !== null) {
            scrollerStyles.height = this.props.height;
            scrollerStyles.minHeight = this.props.height;
            scrollerStyles.overflowY = 'hidden';
        }

        return <div {...this.props} className={classes}>
            {this.props.showTitle && <Header columns={children} />}
            <div className="rui-table-scroller" style={scrollerStyles}>
                {scrollerStyles.height ? <RUI.ScrollView>
                    {children}
                </RUI.ScrollView> : children}
            </div>
        </div>;
    }
});

Table.TitleRender = require('./table/TitleRender.jsx');
Table.ItemRender = require('./table/ItemRender.jsx');

module.exports = Table;