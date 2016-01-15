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
        this.toggleAction(this, 'click', 'selected');
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

        console.log(this.props.value, classes);

        return <label className={classes}>{this.props.children}</label>
    }
});