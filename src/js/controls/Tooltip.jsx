/**
 * 提示组件
 * @module controls/Tooltip
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import TimerMixin from '../mixins/TimerMixin.jsx';

import '../../css/tooltip.scss';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     * @see {@link module:mixins/TimerMixin}
     */
    mixins: [ComponentBase, TimerMixin],
    parentNode: null,
    getInitialState: function () {
        return {
            show: false
        };
    },
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default tooltip
             * @type string
             * @desc 组件名称
             */
            cname: "tooltip",
            /**
             * @instance
             * @default top-center
             * @type string
             * @desc 显示方位, 分为(top middle bottom)和(left center right)两组，可以分别组合
             * @example
             * top-left         左上角
             * middle-right     正右侧
             * bottom-left      左下角
             */
            align: 'top-center',
            /**
             * @instance
             * @default mouseenter
             * @type string
             * @desc 触发显示tooltip的事件
             */
            trigger: 'mouseenter',
            /**
             * @instance
             * @default 500
             * @type number
             * @desc 显示多少时间(ms)后自动消失
             */
            duration: 5000
        };
    },
    componentDidMount: function () {
        var node = ReactDOM.findDOMNode(this);
        if (node && node.parentNode) {
            this.parentNode = node.parentNode;
            if ($(this.parentNode).css('position') == 'static') {
                $(this.parentNode).css('position', 'relative');
            }
            this.bindNodeEvent();
        }
    },
    componentWillUnmount: function () {
        this.unbindNodeEvent();
    },
    componentWillReceiveProps: function (props) {

    },
    bindNodeEvent: function () {
        if (!this.parentNode)
            return;

        // just use jQuery a moment !!!
        $(this.parentNode).bind(this.props.trigger, this.onMouseEnter);
        $(this.parentNode).bind('mouseleave', this.onMouseLeave);
    },
    unbindNodeEvent: function () {
        if (!this.parentNode)
            return;

        // just use jQuery a moment too!!!
        $(this.parentNode).unbind(this.props.trigger, this.onMouseEnter);
        $(this.parentNode).unbind('mouseleave', this.onMouseLeave);
    },
    onMouseEnter: function () {
        this.resetTimer(function () {
            this.setState({
                show: false
            });
        }.bind(this), this.props.duration);

        this.setState({
            show: true
        });
    },
    onMouseLeave: function () {
        this.resetTimer(function () {
            this.setState({
                show: false
            });
        }.bind(this), 100);
    },
    componentDidUpdate: function () {
        var node = ReactDOM.findDOMNode(this);
        $(node).css(this.getPosition(node));

        var arrow = $(node).find('.' + this.getDefaultClass() + '-arrow');
        $(arrow).css(this.getArrowPosition(arrow));

        var back = $(node).find('.' + this.getDefaultClass() + '-arrow-back');
        $(back).css(this.getArrowPosition(arrow).back);
    },
    getArrowPosition: function (node) {
        var main = $(ReactDOM.findDOMNode(this));

        var position = {
            top: 0,
            left: 0,
            back: {
                top: 0,
                left: 0
            }
        };
        var align = this.props.align.split('-');
        if (align.indexOf('top') >= 0) {
            position.top = position.back.top = main.outerHeight() - 1;
            position.back.top -= 1;
        }
        if (align.indexOf('middle') >= 0) {
            position.top = position.back.top = (main.outerHeight() - $(node).outerHeight()) / 2;
        }
        if (align.indexOf('bottom') >= 0) {
            position.top = position.back.top = -20;
            position.back.top += 1;
        }
        if (align.indexOf('left') >= 0) {
            position.left = position.back.left = main.outerWidth() - 1;
            position.back.left -= 1;
        }
        if (align.indexOf('center') >= 0) {
            position.left = position.back.left = (main.outerWidth() - $(node).outerWidth()) / 2;
        }
        if (align.indexOf('right') >= 0) {
            position.left = position.back.left = -20;
            position.back.left += 1;
        }

        if (align.indexOf('top') >= 0 && align.indexOf('left') >= 0) {
            position.top -= 12;
            position.left -= 7;
            position.back.top -= 12;
            position.back.left -= 7;
        }
        if (align.indexOf('top') >= 0 && align.indexOf('right') >= 0) {
            position.top -= 12;
            position.left += 6;
            position.back.top -= 12;
            position.back.left += 6;
        }
        if (align.indexOf('bottom') >= 0 && align.indexOf('left') >= 0) {
            position.left -= 7;
            position.back.left -= 7;
        }
        if (align.indexOf('bottom') >= 0 && align.indexOf('right') >= 0) {
            position.left += 6;
            position.back.left += 6;
        }

        return position;
    },
    getPosition: function (node) {
        var position = {
            top: 0,
            left: 0
        };
        var align = this.props.align.split('-');
        if (align.indexOf('top') >= 0) {
            position.top = $(node).outerHeight() * -1 - 15;
        }
        if (align.indexOf('middle') >= 0) {
            position.top = ($(this.parentNode).outerHeight() - $(node).outerHeight()) / 2
        }
        if (align.indexOf('bottom') >= 0) {
            position.top = $(node).outerHeight() + 15;
        }
        if (align.indexOf('left') >= 0) {
            position.left = -1 * $(node).outerWidth() - 15
        }
        if (align.indexOf('center') >= 0) {
            position.left = ($(this.parentNode).outerWidth() - $(node).outerWidth()) / 2;
        }
        if (align.indexOf('right') >= 0) {
            position.left = $(this.parentNode).outerWidth() + 15;
        }

        return position;
    },
    render: function () {
        var allname = className(this.props.className, this.getPropClass());
        var prefix = this.getDefaultClass();
        var arrows = (this.props.align || 'top');
        var style = this.props.style || {};
        return <div className={allname} style={{display:this.state.show ? 'block' : 'none'}}>
            {this.props.children}
            <div className={prefix+"-arrow "+"arrow-"+arrows}></div>
            <div className={prefix+"-arrow-back "+"arrow-back-"+arrows}></div>
        </div>
    }
});