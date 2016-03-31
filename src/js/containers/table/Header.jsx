import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';
import TitleRender from './TitleRender.jsx';
import ItemRenderDefault from './ItemRenderDefault.jsx';
import Column from './Column.jsx';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {};
    },
    getDefaultProps:function() {
        return {
            cname:'table-header'
        };
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        var length = this.props.columns instanceof Array ? this.props.columns.length : 0;
        return <ul {...this.props} className={classes}>
            {React.Children.map(this.props.columns, function(column, index, all) {
                var render = Column.findExistRender('table-title', column.props.children);
                if(!render) {
                    render = <ItemRenderDefault label={column.props.title || column.props.dataField} style={{height:column.props.titleHeight}} />;
                }
                return <TitleRender key={index} style={{width:column.props.style.width - (index == 0 || (index == length - 1) ? 20 : 0)}}>
                    {render}
                </TitleRender>;
            })}
        </ul>;
    }
});