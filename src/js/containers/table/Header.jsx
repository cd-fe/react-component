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
        return <thead><tr {...this.props} className={classes}>
            {React.Children.map(this.props.columns, function(column, index, all) {
                var result = Column.findExistRender('table-title', column.props.children);
                var render = result.render;
                if(!render) {
                    render = <ItemRenderDefault data={column.props.title || column.props.dataField} />;
                }
                var TitleClassProps = result.item ? result.item.props : {};
                return <TitleRender {...TitleClassProps} className={column.props.titleClassName} key={index} style={{width:column.props.width, height:column.props.titleHeight}}>
                    {render}
                </TitleRender>;
            })}
        </tr></thead>;
    }
});