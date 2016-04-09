import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import throttle from '../util/throttle.jsx';

import '../../css/scrollview.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'scrollview',
            horizonal:false,
            vertical:true,
            scrollTop:0,
            scrollLeft:0,
            scrollType:'stepless', // step
            mouseWheelEnable:true,
            keyboardEnable:true,
            autoUpdate:true,
            scrollAmount:20
        };
    },
    componentDidMount:function() {
        this.updateScroller();

        var node = $(ReactDOM.findDOMNode(this.refs.content));
        var lastWidth = node.width();
        var lastHeight = node.height();

        if(this.props.autoUpdate) {
            setInterval(function() {
                var width = node.width();
                var height = node.height();

                if(width != lastWidth || height != lastHeight) {
                    this.updateScroller();
                }
            }.bind(this), 50);
        }

        if(this.props.mouseWheelEnable) {
            require('jquery-mousewheel');
            var move = throttle(16, this.move);
            node.on('mousewheel', function(e) {
                if(e.deltaX != 0 || e.deltaY != 0) {
                    move(e.deltaX, e.deltaY);
                    return false;
                }
            }.bind(this));
        }
    },
    updateScroller:function() {
        var node = $(ReactDOM.findDOMNode(this.refs.content));
        var outer = $(ReactDOM.findDOMNode(this));

        var outerWidth = outer.width();
        var outerHeight = outer.height();
        var nodeWidth = node.width();
        var nodeHeight = node.height();
    },
    move:function(xd, yd) {
        var node = $(ReactDOM.findDOMNode(this.refs.content));
        if(this.props.horizonal) {
            node.stop().animate({
                'marginLeft':parseInt(node.css('marginLeft')) + xd * this.props.scrollAmount
            });
        }
        if(this.props.vertical) {
            node.css({
                'marginTop':parseInt(node.css('marginTop')) + yd * this.props.scrollAmount
            });
        }
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        return <div {...this.props}  className={classes}>
            <div className="rui-scrollview-content" ref="content">
                {this.props.children}
            </div>
            <div className="rui-scrollview-vbar">
                <div className="rui-scrollview-baritem" ref="baritem" />
            </div>
        </div>;
    }
});