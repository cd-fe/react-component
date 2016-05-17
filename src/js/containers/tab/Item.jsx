/**
 * Tab按钮组件
 * @module containers/tab/Item
 */

import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getDefaultProps: function () {
        return {
            cname: 'tab-item'
        };
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        return <div {...this.props} className={classes}>
            {this.props.children}
        </div>;
    }
});