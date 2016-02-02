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
        // 由于此处对数据进行了深度对比，所以要注意数据的引用情况，
        // 若是指针型的数值改变，可能不会自动触发render，需要使用forceUpdate方法
        // 例如sort，splice等带有副作用的函数
        if(equal(nextProps, this.props) && equal(nextState, this.state)) {
            return false;
        }
        return true;
    }
};