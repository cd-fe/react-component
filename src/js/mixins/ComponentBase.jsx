import PropClassMixin from '../mixins/PropClassMixin.jsx';
import EventMixin from '../mixins/EventMixin.jsx';
import TooltipMixin from '../mixins/ToolTipMixin.jsx';

import equal from '../util/equal.jsx';

module.exports = {
    mixins:[PropClassMixin, EventMixin, TooltipMixin],
    componentWillMount:function() {
        this.bindEvent();
    },
    shouldComponentUpdate:function(nextProps, nextState) {
        if(equal(nextProps, this.props) && equal(nextState, this.state)) {
            return false;
        }
        return true;
    }
};