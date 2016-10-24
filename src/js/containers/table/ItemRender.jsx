/**
 * 单元格组件
 * @module containers/table/ItemRender
 */

import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
    getInitialState:function() {
        return {};
    },
    getDefaultProps:function() {
        return {
            /**
             * @instance
             * @default table-column-item
             * @type string
             * @desc 组件名称
             */
            cname:'table-column-item'
        };
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());

        return <td {...this.props} className={classes}>
            {this.props.children}
        </td>;
    }
});