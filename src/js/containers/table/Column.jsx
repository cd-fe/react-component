import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';
import TitleRender from './TitleRender.jsx';
import ItemRender from './ItemRender.jsx';
import ItemRenderDefault from './ItemRenderDefault.jsx';

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
    render:function() {
        var classes = className(this.props.className, this.getPropClass());

        var titleRender = null;
        if(this.props.children) {
            var children = this.props.children instanceof Array ? this.props.children : [this.props.children];
            var existTitleRender = children.find(function(child) {
                return child.props.cname == 'table-title-render';
            });
            if(existTitleRender) {
                titleRender = existTitleRender.props.children;
            }
        }
        if(!titleRender) {
            titleRender = <ItemRenderDefault dataField={this.props.dataField}/>;
        }

        return <ul {...this.props} className={classes}>

        </ul>;
    }
});