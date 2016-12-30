/**
 * 输入框组件
 * @module controls/AddonInput
 */

import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Input from './Input.jsx';

import '../../css/addoninput.scss';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default input
             * @type string
             * @desc 组件名称
             */
            cname: 'addoninput',
            before: null,
            after: null
        };
    },
    getInitialState: function () {
        return {

        };
    },
    /**
     * 获取当前输入框内的文本
     * @instance
     * @returns {string}
     */
    getValue: function () {
        return this.refs.content.getValue();
    },
    getBefore: function() {
        if(this.props.before) {
            if(typeof this.props.before == 'string') {
                return this.props.before;
            }
            else {
                return this.refs.before;
            }
        }else {
            return null;
        }
    },
    getAfter: function() {
        if(this.props.after) {
            if(typeof this.props.after == 'string') {
                return this.props.after;
            }
            else {
                return this.refs.after;
            }
        }else {
            return null;
        }
    },
    render: function () {
        var before = this.props.before;
        var after = this.props.after;
        var props = omit(this.props, 'cname', 'before', 'after');

        return <div className={className(this.props.className, this.getPropClass())}>
            {!before ? null : <div className="rui-addoninput-add rui-addoninput-before">
                {typeof before=='string' ?
                    <span className="rui-addoninput-add-puretext">{before}</span>
                    : React.cloneElement(before, {
                        ref:"before"
                    })}
            </div>}
            <Input ref="content" {...props} />
            {!after ? null : <div className="rui-addoninput-add rui-addoninput-after">
                {typeof after=='string' ?
                    <span className="rui-addoninput-add-puretext">{after}</span>
                    : React.cloneElement(after, {
                        ref:"after"
                    })}
            </div>}
        </div>;
    }
});
