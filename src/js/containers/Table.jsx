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
    render:function() {
        var classes = className(this.props.className, this.getPropClass());

        var childrenLength = this.props.children instanceof Array ? this.props.children.length : 1;
        var widthPercent = (100 / childrenLength).toFixed(8);
        var children = this.props.children.map(function(column) {
            var styles = column.props.style ? column.props.style : {};
            if(typeof styles.width == 'undefined') {
                styles.width = widthPercent + "%";
            }
            var props = clone(column.props);
            props.style = styles;
            props.source = this.props.dataSource;
            return React.cloneElement(column, props);
        }.bind(this));

        return <div {...this.props} className={classes}>
            {children}
        </div>;
    }
});

Table.TitleRender = require('./table/TitleRender.jsx');
Table.ItemRender = require('./table/ItemRender.jsx');

module.exports = Table;