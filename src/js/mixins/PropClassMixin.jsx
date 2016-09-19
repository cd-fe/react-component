/**
 * 属性关联样式基础方法
 * @module mixins/PropClassMixin
 */

import constant from '../constant.jsx';

module.exports = {
    /**
     * 此方法根据当前属性自动设置className，目前仅包括 shadow（阴影），radius（圆角），disable（禁用状态）
     * @instance
     * @return {string}
     */
    getPropClass:function() {
        var classes = [];

        classes.push(this.getDefaultClass());

        if(this.props.shadow) {
            classes.push('shadow');
        }
        if(this.props.radius) {
            classes.push('radius');
        }
        if(this.props.disable) {
            classes.push('disable');
        }
        if(this.props.grid) {
            classes.push('grid' + this.props.grid);
        }

        return classes.join(' ');
    },
    /**
     * 根据当前组件cname获取默认样式名
     * @instance
     * @return {string}
     */
    getDefaultClass:function() {
        return constant.classPrefix + this.props.cname;
    }
};