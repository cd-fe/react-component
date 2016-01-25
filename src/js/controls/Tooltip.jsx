import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import TimerMixin from '../mixins/TimerMixin.jsx';

import '../../css/tooltip.scss';

module.exports = React.createClass({
    mixins:[ComponentBase, TimerMixin],
    parentNode:null,
    getInitialState:function() {
        return {
            show:false
        };
    },
    getDefaultProps:function() {
        return  {
            cname:"tooltip",
            align:'top-center',
            trigger:'mouseenter',
            duration:5000
        };
    },
    componentDidMount:function() {
        var node = ReactDOM.findDOMNode(this);
        if(node && node.parentNode) {
            this.parentNode = node.parentNode;
            if($(this.parentNode).css('position') == 'static') {
                $(this.parentNode).css('position', 'relative');
            }
            this.bindNodeEvent();
        }
    },
    componentWillUnmount:function() {
        this.unbindNodeEvent();
    },
    componentWillReceiveProps:function(props) {

    },
    bindNodeEvent:function() {
        if(!this.parentNode)
            return;

        // just use jQuery a moment !!!
        $(this.parentNode).bind(this.props.trigger, this.onMouseEnter);
        $(this.parentNode).bind('mouseleave', this.onMouseLeave);
    },
    unbindNodeEvent:function() {
        if(!this.parentNode)
            return;

        // just use jQuery a moment too!!!
        $(this.parentNode).unbind(this.props.trigger, this.onMouseEnter);
        $(this.parentNode).unbind('mouseleave', this.onMouseLeave);
    },
    onMouseEnter:function() {
        this.resetTimer(function() {
            this.setState({
                show:false
            });
        }.bind(this), this.props.duration);

        var node = ReactDOM.findDOMNode(this);
        this.setState({
            show:true
        });
    },
    onMouseLeave:function() {
        this.resetTimer(function() {
            this.setState({
                show:false
            });
        }.bind(this), 100);
    },
    componentDidUpdate:function() {
        var node = ReactDOM.findDOMNode(this);
        $(node).css(this.getPosition());
    },
    getPosition:function() {
        var node = ReactDOM.findDOMNode(this);
        var position = {
            top:0,
            left:0
        };
        var align = this.props.align.split('-');
        if(align.indexOf('top') >= 0) {
            position.top = $(node).outerHeight() * -1 - 15;
        }
        if(align.indexOf('middle') >= 0) {
            position.top = ($(this.parentNode).outerHeight() - $(node).outerHeight()) / 2
        }
        if(align.indexOf('bottom') >= 0) {
            position.top = $(node).outerHeight() + 15;
        }
        if(align.indexOf('left') >= 0) {
            position.left = -1 * $(node).outerWidth() - 15
        }
        if(align.indexOf('center') >= 0) {
            position.left = ($(this.parentNode).outerWidth() - $(node).outerWidth()) / 2;
        }
        if(align.indexOf('right') >= 0) {
            position.left = $(this.parentNode).outerWidth() + 15;
        }

        return position;
    },
    render:function() {
        var allname = className(this.props.className, this.getPropClass());
        var prefix = this.getDefaultClass();
        var arrows = (this.props.align || 'top');
        return <div className={allname} style={{display:this.state.show ? 'block' : 'none'}}>
            {this.props.children}
            <div className={prefix+"-arrow "+"arrow-"+arrows}></div>
            {/*<div className={prefix+"-arrow "+"arrow-back-"+arrows}></div>*/}
        </div>
    }
});