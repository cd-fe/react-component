/**
 * 按钮组件
 * @module controls/Button
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/icon.scss';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default button
             * @type string
             * @desc 组件名称
             */
            cname: 'icon',
            name: ''
        };
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        return <i {...props} className={classes}>
            {this.props.children}
        </i>;
    }
});