import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Column from './table/Column.jsx';
import clone from '../util/clone.jsx';

import '../../css/table.scss';

var Table = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            dataSource:this.props.dataSource || []
        };
    },
    getDefaultProps:function() {
        return {
            cname:'table'
        };
    },
    percent:function(piece) {
        return (100 / piece).toFixed(8);
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        classes += " clearfix";
        var childrenLength = this.props.children instanceof Array ? this.props.children.length : 1;
        var widthPercent = this.percent(childrenLength);
        var children = this.props.children ? this.props.children.map(function(column, index) {
            var styles = column.props.style ? column.props.style : {};
            if(typeof styles.width == 'undefined') {
                styles.width = widthPercent + "%";
            }
            var props = clone(column.props);
            props.style = styles;
            props.source = this.props.dataSource;
            props.key = index;
            return React.cloneElement(column, props);
        }.bind(this)) : (this.props.dataSource && this.props.dataSource.length ? Object.keys(this.props.dataSource[0]).map(function(key, index, all) {
            return <Column source={this.props.dataSource} title={key} dataField={key} key={index} style={{width:this.percent(all.length) + '%'}}/>
        }.bind(this)) : null);

        return <div {...this.props} className={classes}>
            {children}
        </div>;
    }
});

Table.TitleRender = require('./table/TitleRender.jsx');
Table.ItemRender = require('./table/ItemRender.jsx');

module.exports = Table;