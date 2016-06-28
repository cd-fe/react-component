/**
 * 按钮组件
 * @module controls/Button
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/button.scss';

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
            cname: 'button',
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 设置按钮是否禁用
             */
            disable: false
        };
    },
    clickHandler: function (e) {
        if (!this.props.disable) {
            this.dispatchEvent('click', e);

            var node = ReactDOM.findDOMNode(this);
            className.removeClass(node, 'clicked');
            className.addClass(node, 'clicked');
            clearTimeout(this.clickedTimer);
            this.clickedTimer = setTimeout(function() {
                className.removeClass(node, 'clicked');
            }.bind(this), 350);
        }
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        var props = require('../util/omit.jsx')(this.props, 'onClick');
        return <a {...props} onClick={this.clickHandler} className={classes}>
            {this.props.children}
        </a>;
    }
});