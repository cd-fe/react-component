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
            cname:"tooltip"
        };
    },
    componentDidMount:function() {
        var node = ReactDOM.findDOMNode(this);
        if(node && node.parentNode) {
            this.parentNode = node.parentNode;
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
        $(this.parentNode).bind('mouseenter', this.onMouseEnter);
        $(this.parentNode).bind('mouseleave', this.onMouseLeave);
    },
    unbindNodeEvent:function() {
        if(!this.parentNode)
            return;

        // just use jQuery a moment too!!!
        this.parentNode.unbind('mouseenter', this.onMouseEnter);
        this.parentNode.unbind('mouseleave', this.onMouseLeave);
    },
    onMouseEnter:function() {
        this.stopTimer();
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
    render:function() {
        var allname = className(this.props.className, this.getPropClass());
        var prefix = this.getDefaultClass();
        var arrows = 'array-' + (this.props.arrow || 'top');
        return <div className={allname} style={{display:this.state.show ? 'block' : 'none'}}>
            {this.props.children}
            <div className={prefix+"-arrow "+arrows}></div>
        </div>
    }
});