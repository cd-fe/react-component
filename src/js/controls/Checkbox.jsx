/**
 * 多选框组件
 * @module controls/Checkbox
 */

import constant from '../constant.jsx';
import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';

import '../../css/checkbox.scss';

module.exports = React.createClass({
    /**
     * base methods
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase, ToggleMixin],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default checkbox
             * @type string
             * @desc 组件名称
             */
            cname: 'checkbox',
            /**
             * @instance
             * @default
             * @type string
             * @desc 组件值
             */
            value: '',
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 当前是否选中
             */
            selected: undefined,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 初次渲染，默认选中状态
             */
            defaultSelected: undefined
        };
    },
    componentDidMount: function () {
        this.toggleAction(this, 'click', constant.selected);
    },
    /**
     * 获取当前值，选中则有值，未选中则为空
     * @instance
     * @return {string}
     */
    getValue: function () {
        return this.getToggleResult() == constant.selected ? this.props.value : '';
    },
    /**
     * 当前是否选中，选中返回1，未选中返回0
     * @instance
     * @return {number}
     */
    isSelected: function () {
        return this.toggleValue;
    },
    /**
     * 设置当前组件选中状态
     * @param {number} val - 1为选中，0为不选中
     * @instance
     */
    setSelected: function (val) {
        this.toggleValue = !!val ? 1 : 0;
        if (this.dispatchEvent) {
            this.dispatchEvent('change', {
                value: this.props.value,
                selected: this.toggleValue
            });
        }

        this.forceUpdate();
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        classes += ' ' + this.getToggleResult();

        return <label {...this.props} className={classes}>
            <span className="rui-checkbox-selected"><span className="rui-checkbox-circle"></span></span>
            {this.props.children}
        </label>;
    }
});