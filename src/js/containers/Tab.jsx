/**
 * Tab容器
 * @module containers/Tab
 */
import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Panel from './tab/Panel.jsx';
import List from './tab/List.jsx';
import Item from './tab/Item.jsx';

import '../../css/tab.scss';

var Tab = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'tab',
            defaultSelected:0,
            selected:null,
            onSelected:null
        };
    },
    getInitialState:function() {
        return {
            selected:typeof this.props.defaultSelected != 'undefined' ? this.props.defaultSelected : (this.props.selected || 0)
        };
    },
    getList:function() {
        var component = React.Children.toArray(this.props.children).find(function(item) {
            return item.props && item.props.cname == 'tab-list';
        });

        if(component) {
            return React.cloneElement(component, Object.assign({
                onChange:this.listChange,
                ref:'list'
            }, component.props));
        }
        return null;
    },
    getPanels:function() {
        var index = 0;
        return React.Children.map(this.props.children, function(item) {
            if(!item.props || item.props.cname != 'tab-panel') {
                return undefined;
            }
            return React.cloneElement(item, Object.assign({
                index:index++,
                ref:"panel" + index
            }, item.props));
        });
    },
    getActivePanel:function() {
        var panels = this.getPanels();
        return panels.find(function(item) {
            return item.props.index == this.state.selected;
        }.bind(this));
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        var props = omit(this.props, 'cname', 'defaultSelected', 'selected', 'onSelected');
        return <div {...props} className={classes}>
            {this.getList()}
            {this.getActivePanel()}
        </div>;
    }
});

Tab.Panel = Panel;
Tab.List = List;
Tab.Item = Item;

module.exports = Tab;