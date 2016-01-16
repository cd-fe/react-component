import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';

import '../../css/radio.scss';

module.exports = React.createClass({
    mixins:[ComponentBase, ToggleMixin],
    getDefaultProps:function() {
        return {
            cname:'radio'
        };
    },
    componentDidMount:function() {
        this.toggleValues = ['', 'selected'];
        this.toggleValue = this.props.selected ? 1 : 0;

        var node = ReactDOM.findDOMNode(this);
        node.addEventListener('click', this.clickHandler);

        this.forceUpdate();
    },
    componentWillUnmount:function() {
        var node = ReactDOM.findDOMNode(this);
        node.removeEventListener('click', this.clickHandler);
    },
    clickHandler:function(event) {
        var change;
        if(this.props.groupValidate) {
            change = this.props.groupValidate.call(null, event, this);
        }else {
            this.toggle();
            this.forceUpdate();
        }
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());

        var array = classes.split(' ');
        var index = array.findIndex(function(item) {
            return item == 'selected';
        });
        if(index >= 0) {
            array = array.splice(index, 1);
        }
        classes = array.join(" ");

        classes += ' ' + this.getToggleResult();

        return <label className={classes} selected={this.props.selected}>{this.props.children}</label>
    }
});