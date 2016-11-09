/**
 * 基础组件方法
 * @module mixins/ComponentBase
 */
import PropClassMixin from '../mixins/PropClassMixin.jsx';
import EventMixin from '../mixins/EventMixin.jsx';
import TooltipMixin from '../mixins/TooltipMixin.jsx';

import equal from '../util/equal.jsx';

module.exports = {
    /**
     * 合并其它工具类
     * @instance
     * @see {@link module:mixins/PropClassMixin}
     * @see {@link module:mixins/EventMixin}
     */
    mixins:[PropClassMixin, EventMixin, TooltipMixin],
    componentWillMount:function() {
        this.bindEvent();
    },
    /**
     * 所有组件继承这个方法，可以通过此方法控制组件库的性能
     * @instance
     * @param nextProps
     * @param nextState
     * @return {boolean}
     */
    shouldComponentUpdate:function(nextProps, nextState) {
        // 由于此处对数据进行了深度对比，所以要注意数据的引用情况，
        // 若是指针型的数值改变，可能不会自动触发render，需要使用forceUpdate方法
        // 例如sort，splice等带有副作用的函数
        //if(this.props.cname != 'input'
        //    && equal(nextProps, this.props)
        //    && equal(nextState, this.state)
        //) {
        //    return false;
        //}
        if(this.props.cname == 'datepicker') {
            if(equal(nextProps, this.props) && equal(nextState, this.state)) {
                return false;
            }
        }
        return true;
    }
};