import PropClassMixin from '../mixins/PropClassMixin.jsx';
import EventMixin from '../mixins/EventMixin.jsx';
import TooltipMixin from '../mixins/ToolTipMixin.jsx';

module.exports = {
    mixins:[PropClassMixin, EventMixin, TooltipMixin],
    componentWillMount:function() {
        this.bindEvent();
    }
};