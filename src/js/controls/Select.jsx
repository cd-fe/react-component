/**
 * 下拉菜单组件
 * @module controls/Select
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import TimerMixin from '../mixins/TimerMixin.jsx';
import '../../css/select.scss';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     * @see {@link module:mixins/TimerMixin}
     */
    mixins: [ComponentBase, TimerMixin],
    _choose: null,
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default select
             * @type string
             * @desc 组件名称
             */
            cname: "select",
            /**
             * @instance
             * @default mouseenter
             * @type string
             * @desc 触发下拉菜单显示的事件名称
             */
            event: "mouseenter",
            className: "rui-theme-1",
            /**
             * @instance
             * @default true
             * @type boolean
             * @desc 是否点击后回填输入框
             */
            stuff: true,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否启用下拉搜索框
             */
            filter: false,
            /**
             * @instance
             * @default []
             * @type array
             * @desc 显示的内容所需的数据
             * @example
             * <RUI.Select data={[{key:'查看',value:'1'}, {key:'编辑',value:'2'}, {key:'删除',value:'3'}]} />
             */
            data: [],
            /**
             * @instance
             * @default empty function
             * @type function
             * @desc 下拉确定回调
             */
            callback: function() {},
            /**
             * @instance
             * @default 100%
             * @type string
             * @desc 下拉框垂直偏移量
             */
            offset: '',
            /**
             * @instance
             * @default null
             * @type RegExp
             * @desc 搜索过滤规则
             */
            reg: null,
            /**
             * @instance
             * @default ''
             * @type string
             * @desc 搜索框默认占位符
             */
            placeholder: '',
            /**
             * @instance
             * @default ''
             * @type string
             * @desc 搜索异常时提示信息
             */
            result: '',
            /**
             * @instance
             * @default '200'
             * @type string
             * @desc 搜索框允许输入长度
             */
            maxLen: '200',
            /**
             * @instance
             * @default 3
             * @type number
             * @desc 可见下拉选项个数，超过出现滚动条
             */
            optionsLimit: 3,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否禁用
             */
            disable: false
        };
    },
    getInitialState: function () {
        var value = this.props.value || (this.props.data instanceof Array && this.props.data[0]);
        return {
            active: false,
            filter: this.props.filter,
            event: this.props.event,
            data: this.props.data,
            disable: this.props.disable,
            value: value,
            choosedKey : value.key || '请选择'
        };
    },
    componentWillReceiveProps: function (nextProps) {
        var newProps = {};
        typeof nextProps.data != 'undefined' && (newProps.data = nextProps.data);
        typeof nextProps.value != 'undefined' && (newProps.value = nextProps.value);
        typeof nextProps.disable != 'undefined' && (newProps.disable = nextProps.disable);
        this.setState(newProps);
    },
    getThisNode : function() {
        return ReactDOM.findDOMNode(this);
    },
    componentDidMount: function () {
        this.doEvent()
    },
    onMouseLeave: function () {
        this.close();
    },
    open: function () {
        var _this = this;
        var options = this.refs.options;
        options.style.display = 'block';
        setTimeout(function () {
            _this.setState({
                active: true
            });
        }, 10);

    },
    close: function () {
        var _this = this;
        var options = _this.refs.options;
        _this.setState({active: false});
        setTimeout(function () {
            if (_this.state.active === false) {
                options.style.display = 'none';
            }
        }, 100);
    },
    isShowLists : function() {
        //特殊情况下，不展示下拉列表
        return (this.state.data.length > 1 || this.props.filter || (this.props.className.indexOf('rui-theme-2') == -1));
    },
    scrollLists : function(node) {
        //展示滚动条
        (this.state.data.length > this.props.optionsLimit) && node.css({
            overflowY : 'scroll'
        });
    },
    doEvent : function() {
        var _this = this;
        var node = this.getThisNode();
        var ul = $(node).find('ul');
        var li = ul.find('li');
        if (this.props.event == 'mouseenter') {
            $(node).bind(this.props.event, function () {
                (!_this.state.disable) && (_this.isShowLists()) && _this.startTimer(function () {
                    if (_this.state.active) {
                        _this.close();
                    } else {
                        _this.open();
                    }
                }, 200);
               _this.scrollLists(ul);
            });
            $(node).bind('mouseleave', function () {
                if ((!_this.state.disable) && _this.__timer) {
                    _this.stopTimer();
                    _this.onMouseLeave();
                }
            });
        } else {
            $(node).bind('mouseleave', function() {
                (!_this.state.disable) &&(_this.isShowLists()) && _this.onMouseLeave();
            });
            $(node).bind(this.props.event, function () {
                if((!_this.state.disable) && _this.isShowLists()) {
                    if (_this.state.active) {
                        _this.close();
                    } else {
                        _this.open();
                    }
                    _this.scrollLists(ul);
                }
            });
        }
    },
    handleClick: function (e) {
        var _this = this;

        this.isShowLists() && this.close();
        this.props.stuff && (this.state.choosedKey = e.key);

        this.setState({
            value : e
        },function() {
            if (_this.dispatchEvent) {
                _this.dispatchEvent('change', _this.getValue());
            }
            _this.props.callback && _this.props.callback(e);
        });
    },
    handleFilter: function (source) {
        var _this = this, res;
        var reg = this.props.reg;
        var value = ReactDOM.findDOMNode(this.refs.filter).value;
        var result;
        if (this.props.filter) {
            if (!reg || reg.test(value)) {
                if (this.props.filterCallback) {
                    result = this.props.filterCallback(value);
                    if (result && result.length > 0) {
                        this.setState({
                            data: result
                        })
                    } else {
                        this.setState({
                            data: [{key: this.props.result, value: 'error'}]
                        })
                    }
                }
            }else {
                this.setState({
                    data: [{key: this.props.result, value: 'error'}]
                })
            }
        }
    },
    _getChoose: function () {
        return this.state.value;
    },
    getValue: function () {
        return this._getChoose();
    },
    getFilterHtml : function() {
        return this.props.filter ? (
            <div className="filter">
                <RUI.Input ref="filter" maxLength={this.props.maxLen} onChange={this.handleFilter} placeholder={this.props.placeholder} />
            </div>
        ) : null;
    },
    render: function () {
        var _this = this,
            style = {},
            active = this.state.active,
            data = this.state.data,
            deClass = className(this.props.className, this.getPropClass()),
            optCls = 'rui-select-options',
            final = active ? deClass + ' active' : deClass,
            offset = this.props.offset ? Number(this.props.offset) : '100%';

        var except = (data.length == 1 && this.props.offset == '0');

        (offset != '100%') && (final = className(final, 'noactive'));

        if(this.state.disable) {
            final = className(final, 'disable');
        }
        if(!except && this.props.className.indexOf('rui-theme-1') > -1 && typeof offset == 'number') {
            offset = offset - 5;
        }
        style.top = offset;
        if(except) {
            style.zIndex = '1049';
            optCls += ' one'
        }
        return (
            <div className={final} onChange={this.props.onChange}>
                <i className="arrow"></i>
                <span ref="choose" className="placeholder">{this.state.choosedKey}</span>
                <div className="rui-select-options-wrap" style={style}>
                    <div ref="options" className={optCls}>
                        {this.getFilterHtml()}
                        <ul>
                            {
                                data.map(function (item, index) {
                                    return (
                                        <li
                                            key={index}
                                            className={(item.key == _this.state.value.key && !except) && "choosed"}
                                            onClick={item.value == 'error' ? null : _this.handleClick.bind(_this,item)}
                                        >
                                            <a href="javascript:;">{item.key}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});