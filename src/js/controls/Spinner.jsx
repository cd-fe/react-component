/**
 * 数字调节器组件
 * @module controls/Spinner
 */

import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import cap from '../util/capitalize.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Icon from '../controls/Icon.jsx';

import '../../css/spinner.scss';

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
             * @default spinner
             * @type string
             * @desc 组件名称
             */
            cname: 'spinner',
            /**
             * @instance
             * @default input
             * @type string
             * @desc 以何种模式显示数字调节器，分为input输入框模式和slider滑动条模式
             */
            type: 'input',
            /**
             * @instance
             * @default 1
             * @type number
             * @desc 单步递变值
             */
            step: 1,
            /**
             * @instance
             * @default 9999
             * @type number
             * @desc 最大值
             */
            max: 9999,
            /**
             * @instance
             * @default 0
             * @type number
             * @desc 最小值
             */
            min: 0,
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否启用键盘上下键控制
             */
            keyboardEnable: true,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否禁用
             */
            disable: false,
            /**
             * @instance
             * @default blur
             * @type string
             * @desc 手动输入内容后，根据此事件触发内容校正
             */
            eventType: 'blur',
            /**
             * @instance
             * @default null
             * @type function
             * @desc 当内容变更后的回调事件
             * @example
             * changeHandler:function(val) {
             *      console.log(val);
             * }
             */
            onChange: null,
            /**
             * @instance
             * @member
             * @default function(str) {return str;}
             * @type function
             * @desc 对显示的内容进行最后的修改
             */
            fieldFunction: function (str) {
                return str;
            }
        };
    },
    getInitialState: function () {
        return {
            value: this.props.value || (this.props.min + "")
        };
    },
    componentDidMount: function () {
        if (this.props.type == 'input') {
            this.updateKeyboardEvent();
        }
        if (this.props.type == 'slider') {
            this.updateMouseEvent();
        }
    },
    componentWillUnmount: function () {
        var node = ReactDOM.findDOMNode(this.refs.input);
        $(node).unbind('keydown');
    },
    updateMouseEvent: function () {
        var _this = this;
        var area = ReactDOM.findDOMNode(_this.refs.area);
        var point = ReactDOM.findDOMNode(_this.refs.point);

        var originWidth = $(area).width();

        function fixedOffset(offset) {
            offset = Number((offset / originWidth * _this.props.max).toFixed(0));
            var mod = offset % _this.props.step;
            if(mod < _this.props.step / 2) {
                offset -= mod;
            }
            else {
                offset = offset - mod + _this.props.step;
            }

            var event = _this.createEvent('custom-spinner-event');
            event.data = offset;
            _this.changeHandler(event);
        }

        function backHandler(e) {
            var offset = e.offsetX;
            fixedOffset(offset);
        }

        function pointHandler(e) {
            var originOffset = $(area).offset().left;
            $('body').bind('mousemove', (e)=>{
                var offset = e.pageX - originOffset;
                fixedOffset(offset);
            });
            $('body').bind('mouseup', (e)=>{
                $('body').unbind('mousemove');
                $('body').unbind('mouseup');
            });
            return false;
        }

        $(area).unbind('mousedown');
        $(point).unbind('mousedown');
        if (_this.props.type == 'slider') {
            $(area).bind('mousedown', backHandler);
            $(point).bind('mousedown', pointHandler);
        }
    },
    updateKeyboardEvent: function () {
        var _this = this;

        function keyHandler(e) {
            if (e.keyCode == 38) {
                _this.doCount(1);
                return false;
            }
            if (e.keyCode == 40) {
                _this.doCount(-1);
                return false;
            }
        }

        var node = ReactDOM.findDOMNode(this.refs.input);
        $(node).unbind('keydown');
        if (this.props.keyboardEnable) {
            $(node).bind('keydown', keyHandler);
        }
    },
    /**
     * 获取当前值
     * @instance
     * @returns {number}
     */
    getValue: function () {
        return this.state.value;
    },
    doCount: function (direction, val) {
        if (this.props.disable) {
            return;
        }
        //修复this.state.value=="0"时出现NaN的BUG
        var originalNumber = Number(typeof val == 'number' ? val : (this.state.value ? this.state.value : 0));
        if (isNaN(originalNumber)) {
            throw new Error("Number is needed");
        }
        var value = originalNumber + direction * this.props.step;
        value = Math.max(Math.min(value, this.props.max), this.props.min * 1);

        var isSame = value == this.state.value;
        this.setState({
            value: value
        }, function () {
            (!isSame && this.props.onChange) && this.props.onChange.call(null, this.state.value, this);
        }.bind(this));
    },
    changeHandler: function (e) {
        var value = e.target ? e.target.value : e.data;
        this.doCount(0, value - (value % this.props.step));
    },
    componentWillReceiveProps: function (nextProps) {
        var update = {};
        var flag = false;
        if (typeof nextProps.value != 'undefined' && nextProps.value != this.state.value) {
            update.value = Math.max(Math.min(nextProps.value, this.props.max), this.props.min);
        }
        if (typeof nextProps.max != 'undefined') {
            update.value = Math.min(nextProps.max, (update.value || this.state.value));
        }
        if (typeof nextProps.min != 'undefined') {
            update.value = Math.max(nextProps.min, (update.value || this.state.value));
        }
        if (typeof nextProps.keyboardEnable !== this.props.keyboardEnable) {
            flag = true;
        }
        this.setState(update, function () {
            flag && this.updateKeyboardEvent();
            this.props.type == 'slider' && this.updateMouseEvent();
        }.bind(this));
    },
    render: function () {
        var props = omit(this.props, 'onChange', 'value');
        var classes = className(this.props.className, this.getPropClass());
        var left = 0;

        if (this.props.type == 'slider') {
            classes += ' rui-spinner-slider';
            left = (this.state.value/this.props.max * 100).toFixed(0);
        }

        var inputProps = {
            ref: "input",
            className: "rui-spinner-input",
            value: this.props.fieldFunction(this.state.value),
            disable: this.props.disable
        };
        inputProps['on' + cap(this.props.eventType)] = this.changeHandler;

        return <div {...props} className={classes}>
            {this.props.type == 'input' && <div>
                <RUI.Button className="rui-spinner-button" onClick={this.doCount.bind(this, -1)} icon="subtract"/>
                <RUI.Input {...inputProps} />
                <RUI.Button className="rui-spinner-button" onClick={this.doCount.bind(this, 1)} icon="add"/>
            </div>}
            {this.props.type == 'slider' && <div>
                <div className="rui-spinner-slider-text">{this.props.fieldFunction(this.state.value)}</div>
                <div className="rui-spinner-slider-back" ref="area">
                    <div className="rui-spinner-slider-fore" style={{width:left + '%'}}></div>
                    <RUI.Button className="rui-spinner-slider-point" ref="point" style={{left:left + '%'}}/>
                </div>
            </div>}
        </div>;
    }
});