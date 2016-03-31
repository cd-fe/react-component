import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Column from './table/Column.jsx';
import clone from '../util/clone.jsx';

import '../../css/table.scss';

var Table = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            dataSource:this.props.dataSource || [],
            componentWidth:0
        };
    },
    getDefaultProps:function() {
        return {
            cname:'table',
            titleHeight:38,
            itemHeight:36,
            itemMiddle:true,
            columnsFilter:function(keys) {
                return keys;
            }
        };
    },
    componentDidMount:function() {
        $(window).bind('resize', this.updateWidth);
        this.updateWidth();
    },
    componentWillUnmount:function() {
        $(window).unbind('resize', this.updateWidth);
    },
    updateWidth:function() {
        var node = $(ReactDOM.findDOMNode(this));
        // 先让父容器能够自适应宽度
        node.width('auto');
        var width = node.width();
        // 在某些父容器百分比设置的情况下，会出现小数点的宽度，与获取到的宽度不一致，导致布局异常，因此，获取是多少，就重新再设置一遍回去
        node.width(width);
        this.setState({
            componentWidth : width
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
        React.Children.map(this.props.children, function(child) {
            if(typeof child.props.width == 'undefined') {
                totalAutoCount++;
            }else {
                totalWidth -= parseInt(child.props.width, 10);
            }
        });
        var itemWidth = Math.floor(totalWidth / totalAutoCount) * 1;
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
        }.bind(this)) : (this.props.dataSource && this.props.dataSource.length ? this.props.columnsFilter(Object.keys(this.props.dataSource[0])).map(function(key, index, all) {
            return <Column
                titleHeight={this.props.titleHeight}
                itemHeight={this.props.itemHeight}
                source={this.props.dataSource}
                title={key}
                dataField={key}
                key={index}
                itemMiddle={this.props.itemMiddle}
                style={{width:this.percent(all.length) + '%'}}
            />;
        }.bind(this)) : null);

        return <div {...this.props} className={classes}>
            {children}
        </div>;
    }
});

Table.TitleRender = require('./table/TitleRender.jsx');
Table.ItemRender = require('./table/ItemRender.jsx');

module.exports = Table;