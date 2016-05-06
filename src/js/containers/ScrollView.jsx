/**
 * 滚动视图组件
 * @module containers/ScrollView
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import throttle from '../util/throttle.jsx';

import '../../css/scrollview.scss';

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
             * @default scrollview
             * @type string
             * @desc 组件名称
             */
            cname: 'scrollview',
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否启用横向滚动
             */
            horizonal: false,
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否启用竖向滚动
             */
            vertical: true,
            /**
             * @instance
             * @default 0
             * @type number
             * @desc 滚动到距离顶部多少像素的地方
             */
            scrollTop: 0,
            /**
             * @instance
             * @default 0
             * @type number
             * @desc 滚动到距离左侧多少像素的地方
             */
            scrollLeft: 0,
            /**
             * @instance
             * @default stepless
             * @type string
             * @desc 设置滑动类型为无缝滑动(stepless)和按步滑动(step)
             */
            scrollType: 'stepless', // step
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否启用鼠标滚轮
             */
            mouseWheelEnable: true,
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否启用键盘控制滑动
             */
            keyboardEnable: true,
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否启用自动监控容器大小，进行滚动条自适应，在某些特殊情况下，可关闭此功能以提升性能
             */
            autoUpdate: true,
            /**
             * @instance
             * @default 20
             * @type number
             * @desc 单次滑动距离
             */
            scrollAmount: 20
        };
    },
    getInitialState:function() {
        return {
            vbarItemHeight:20,
            hbarItemWidth:20,
            scrollTop:this.props.scrollTop,
            scrollLeft:this.props.scrollLeft,
            outerWidth:0,
            outerHeight:0,
            nodeWidth:0,
            nodeHeight:0,
            active:false,
            dragging:false
        };
    },
    componentDidMount: function () {
        this.updateScroller();

        var node = $(ReactDOM.findDOMNode(this));
        var lastWidth = node.width();
        var lastHeight = node.height();

        if (this.props.autoUpdate) {
            var updateScroller = throttle(150, this.updateScroller);
            this.autoUpdater = setInterval(function () {
                var width = node.width();
                var height = node.height();

                if (width != lastWidth || height != lastHeight) {
                    updateScroller();
                }
            }.bind(this), 50);
        }

        if (this.props.mouseWheelEnable) {
            var move = throttle(16, this.move);
            node.mousewheel(function (e, delta, deltaX, deltaY) {
                if (deltaX != 0 || deltaY != 0) {
                    move(deltaX, deltaY);
                    return false;
                }
            }.bind(this));
        }

        if(this.props.vertical) {
            var vbar = $(ReactDOM.findDOMNode(this.refs.vbar));
            var vbarItem = $(ReactDOM.findDOMNode(this.refs.vbaritem));

            var entryPoint = null;

            vbar.on('mouseup', function(e) {
                if(entryPoint) {
                    return;
                }
                var offsetY = e.pageY;
                this.move(0, (offsetY > vbarItem.offset().top ? -1 : 1) * (this.state.outerHeight / this.props.scrollAmount));
            }.bind(this));

            function clear(e) {
                $(window).unbind('mousemove');
                entryPoint = null;
                e.stopPropagation();
                e.preventDefault();

                this.setState({
                    dragging:false
                });

                return false;
            }

            vbarItem.on('mousedown', function(e) {
                entryPoint = {
                    y:e.pageY
                };

                $(window).on('mousemove', function(e) {
                    var offsetY = e.pageY - entryPoint.y;
                    var percent = this.state.outerHeight / this.state.nodeHeight;
                    this.move(0, (offsetY > 0 ? -1 : 1) * percent * Math.abs(offsetY));

                    entryPoint = {
                        y:e.pageY
                    };
                }.bind(this));

                $(window).on('mouseup', clear.bind(this));

                this.setState({
                    dragging:true
                });
            }.bind(this));
        }

        node.on('mouseenter', function(e) {
            this.setState({
                active:true
            });
        }.bind(this)).on('mouseleave', function(e) {
            this.setState({
                active:false
            });
        }.bind(this));
    },
    componentWillUnmount:function() {
        clearInterval(this.autoUpdater);
    },
    updateScroller: function () {
        var node = $(ReactDOM.findDOMNode(this.refs.content));
        var outer = $(ReactDOM.findDOMNode(this));

        var outerWidth = outer.width();
        var outerHeight = outer.height();
        var nodeWidth = node.width();
        var nodeHeight = node.height();

        var update = {
            outerWidth:outerWidth,
            outerHeight:outerHeight,
            nodeWidth:nodeWidth,
            nodeHeight:nodeHeight
        };
        if(this.props.vertical) {
            var vscreens = nodeHeight / outerHeight;
            update.vbarItemHeight = vscreens < 1 ? 0 : outerHeight / vscreens;
        }
        if(this.props.horizonal) {
            var hscreens = nodeWidth / outerWidth;
            update.hbarItemWidth = hscreens < 1 ? 0 : outerWidth / hscreens;
        }

        this.setState(update);
    },
    move: function (xd, yd) {
        var node = $(ReactDOM.findDOMNode(this.refs.content));
        var outer = $(ReactDOM.findDOMNode(this));
        if (this.props.horizonal) {
            var result = parseInt(node.css('marginLeft')) + xd * this.props.scrollAmount;
            node.css({
                'marginLeft': result
            });
            this.setState({
                scrollLeft:result
            });
        }
        if (this.props.vertical) {
            var result = Math.max(-1 * node.height() + outer.height(), Math.min(0, parseInt(node.css('marginTop')) + yd * this.props.scrollAmount));
            node.css({
                'marginTop': result
            });
            this.setState({
                scrollTop:result
            });
        }
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        var vpercent = this.state.scrollTop / (this.state.nodeHeight - this.state.outerHeight);
        vpercent = isNaN(vpercent) || !isFinite(vpercent) ? 0 : vpercent;

        if(this.state.active) {
            classes += ' active';
        }

        if(this.state.dragging) {
            classes += ' noselect';
        }

        return <div {...this.props} className={classes}>
            <div className="rui-scrollview-content clearfix" ref="content">
                {this.props.children}
            </div>
            <div className="rui-scrollview-vbar" ref="vbar">
                <div className="rui-scrollview-baritem" ref="vbaritem" style={{height:this.state.vbarItemHeight,marginTop:-1 * vpercent * (this.state.outerHeight - this.state.vbarItemHeight)}}/>
            </div>
            <div className="rui-scrollview-hbar" ref="hbar">
                <div className="rui-scrollview-baritem" ref="hbaritem" style={{width:this.state.hbarItemWidth}}/>
            </div>
        </div>;
    }
});