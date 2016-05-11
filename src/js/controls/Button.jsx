/**
 * 按钮组件
 * @module controls/Button
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/button.scss';

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
             * @default button
             * @type string
             * @desc 组件名称
             */
            cname: 'button',
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 设置按钮是否禁用
             */
            disable: false
        };
    },
    getInitialState:function() {
        return {
            useSvg:false,
            loading:false,
            success:false,
            error:false
        };
    },
    clickHandler: function (e) {
        if (!this.props.disable) {
            this.dispatchEvent('click', e);
        }
    },
    loading:function() {
        this.setState({
            useSvg:true,
            loading:true,
            success:false,
            error:false
        });
    },
    success:function() {
        this.setState({
            useSvg:true,
            loading:false,
            success:true,
            error:false
        });
    },
    error:function() {
        this.setState({
            useSvg:true,
            loading:false,
            success:false,
            error:true
        });
    },
    _renderSvg:function() {
        return <div>
            <svg className={'rui-button-loading'} viewBox="0 0 41 41">
                <path d="M38,20.5 C38,30.1685093 30.1685093,38 20.5,38" />
            </svg>
            <svg className={'rui-button-success'} viewBox="0 0 70 70">
                <path d="m31.5,46.5l15.3,-23.2" />
                <path d="m31.5,46.5l-8.5,-7.1" />
            </svg>
            <svg className={'rui-button-error'} viewBox="0 0 70 70">
                <path d="m35,35l-9.3,-9.3" />
                <path d="m35,35l9.3,9.3" />
                <path d="m35,35l-9.3,9.3" />
                <path d="m35,35l9.3,-9.3" />
            </svg>
        </div>;
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        var props = require('../util/omit.jsx')(this.props, 'onClick');
        return <a {...props} onClick={this.clickHandler} className={classes}>
            {this.props.children}
            {this.state.useSvg && this._renderSvg()}
        </a>;
    }
});