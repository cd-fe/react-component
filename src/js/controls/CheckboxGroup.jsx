/**
 * 多选框组合
 * @module controls/CheckboxGroup
 */

import className from '../util/className.jsx';
import empty from '../util/empty.jsx';
import clone from '../util/clone.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    groupValues: [],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default checkboxgroup
             * @type string
             * @desc 组件名称
             */
            cname: 'checkboxgroup'
        };
    },
    /**
     * 获取当前多选框组合的值
     * @instance
     * @returns {Array}
     * @example
     *  return [
     *      {"value":"type_1","selected":1},
     *      {"value":"type_2","selected":1},
     *      {"value":"type_3","selected":0}
     *  ]
     */
    getValue: function () {
        return this.groupValues;
    },
    childrenChangeHandler: function (index, event) {
        this.groupValues[index] = event.data;
        this.dispatchEvent('change', this.getValue());
    },
    render: function () {
        var children = [];
        if (this.props.children) {
            children = React.Children.map(this.props.children, function (child, index) {
                var props = clone(child.props);
                if (props && !empty(props)) {
                    if (props.onChange) {
                        props.onChange = [props.onChange, this.childrenChangeHandler.bind(this, index)];
                    } else {
                        props.onChange = this.childrenChangeHandler.bind(this, index);
                    }
                } else {
                    props = {
                        onChange: this.childrenChangeHandler.bind(this, index)
                    };
                }

                var itemProps = {
                    value: props.value || ""
                };
                if(typeof props.selected != 'undefined') {
                    itemProps.selected = props.selected ? 1 : 0;
                }
                else if(typeof props.defaultSelected != 'undefined') {
                    itemProps.defaultSelected = props.defaultSelected ? 1 : 0;
                }

                this.groupValues[index] = itemProps;

                props.key = index;
                return React.cloneElement(child, props);
            }.bind(this));
        }

        var classes = className(this.props.className, this.getPropClass());
        return <div className={classes}>{children}</div>
    }
});