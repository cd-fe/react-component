/**
 * 标题栏单元格组件
 * @module containers/table/TitleRender
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
             * @default table-title
             * @type string
             * @desc 组件名称
             */
            cname:'table-title'
        };
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        return <li {...this.props} className={classes}>
            {this.props.children}
        </li>;
    }
});