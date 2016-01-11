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
        classes += ' ' + this.getToggleResult();

        return <label className={classes}>{this.props.children}</label>
    }
});