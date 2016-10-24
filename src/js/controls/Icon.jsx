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
             * @default icon
             * @type string
             * @desc 组件名称
             */
            cname: 'icon',
            /**
             * @instance
             * @default
             * @type string
             * @desc icon名称,默认提供如下icon:
             * loading
             * arrow-left
             * arrow-right
             * more
             * close
             * calendar
             * upload
             * attach
             * search
             * subtract
             * add
             * success
             * error
             * resize
             */
            name: ''
        };
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass())
        if(this.props.name) {
            classes += ' ' + this.getDefaultClass() + '-' + this.props.name;
        }
        return <i {...this.props} className={classes}>&nbsp;&nbsp;
            {this.props.children}
        </i>;
    }
});