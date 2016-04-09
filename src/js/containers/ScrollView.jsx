import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import throttle from '../util/throttle.jsx';

import '../../css/scrollview.scss';

module.exports = React.createClass({
    mixins: [ComponentBase],
    getDefaultProps: function () {
        return {
            cname: 'scrollview',
            horizonal: false,
            vertical: true,
            scrollTop: 0,
            scrollLeft: 0,
            scrollType: 'stepless', // step
            mouseWheelEnable: true,
            keyboardEnable: true,
            autoUpdate: true,
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
            nodeHeight:0
        };
    },
    componentDidMount: function () {
        this.updateScroller();

        var node = $(ReactDOM.findDOMNode(this.refs.content));
        var lastWidth = node.width();
        var lastHeight = node.height();

        if (this.props.autoUpdate) {
            var updateScroller = throttle(150, this.updateScroller);
            setInterval(function () {
                var width = node.width();
                var height = node.height();

                if (width != lastWidth || height != lastHeight) {
                    updateScroller();
                }
            }.bind(this), 50);
        }

        if (this.props.mouseWheelEnable) {
            require('jquery-mousewheel');
            var move = throttle(16, this.move);
            node.on('mousewheel', function (e) {
                if (e.deltaX != 0 || e.deltaY != 0) {
                    move(e.deltaX, e.deltaY);
                    return false;
                }
            }.bind(this));
        }
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

        return <div {...this.props} className={classes}>
            <div className="rui-scrollview-content" ref="content">
                {this.props.children}
            </div>
            <div className="rui-scrollview-vbar">
                <div className="rui-scrollview-baritem" ref="baritem" style={{height:this.state.vbarItemHeight,marginTop:-1 * vpercent * (this.state.outerHeight - this.state.vbarItemHeight)}}/>
            </div>
            <div className="rui-scrollview-hbar">
                <div className="rui-scrollview-baritem" ref="baritem" style={{width:this.state.hbarItemWidth}}/>
            </div>
        </div>;
    }
});