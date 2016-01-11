import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/button.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            mouseDown:false
        };
    },
    getDefaultProps:function() {
        return {
            cname:'button'
        };
    },
    componentDidMount:function() {
        var node = ReactDOM.findDOMNode(this);
        node.addEventListener('mousedown', this.mouseDownHandler);
        document.body.addEventListener('mouseup', this.mouseUpHandler);
    },
    componentWillUnmount:function() {
        var node = ReactDOM.findDOMNode(this);
        node.removeEventListener('mousedown', this.mouseDownHandler);
        document.body.removeEventListener('mouseup', this.mouseUpHandler);
    },
    mouseDownHandler:function() {
        this.setState({
            mouseDown:true
        });
    },
    mouseUpHandler:function() {
        this.setState({
            mouseDown:false
        });
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        if(this.state.mouseDown) {
            classes += ' active';
        }
        return <a {...this.props} className={classes}>{this.props.children}</a>
    }
});