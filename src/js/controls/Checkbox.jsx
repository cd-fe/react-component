import constant from '../constant.jsx';
import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';

import '../../css/checkbox.scss';

module.exports = React.createClass({
    mixins:[ComponentBase, ToggleMixin],
    getDefaultProps:function() {
        return {
            cname:'checkbox'
        };
    },
    componentDidMount:function() {
        this.toggleAction(this, 'click', constant.selected);
    },
    getValue:function() {
        return this.getToggleResult() == constant.selected ? this.props.value : '';
    },
    isSelected:function() {
        return this.toggleValue;
    },
    setSelected:function(val) {
        this.toggleValue = !!val ? 1 : 0;
        if (this.dispatchEvent) {
            this.dispatchEvent('change', {
                value: this.props.value,
                selected: this.toggleValue
            });
        }

        this.forceUpdate();
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        classes += ' ' + this.getToggleResult();

        return <label className={classes}>{this.props.children}</label>
    }
});