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
    getInitialState: function () {
        return {
            active: false,
            filter: this.props.filter || false,//过滤筛选
            event: this.props.event || 'mouseenter',//事件类型mousover,click,dbclick
            data: this.props.data || [],//数据
            value: this.props.value || (this.props.data instanceof Array && this.props.data[0]),//默认值
            callback: this.props.callback,//回调
            offset: this.props.offset,
            reg: this.props.reg,
            placeholder: this.props.placeholder,
            result: this.props.result,
            maxLen: this.props.maxLen || '200',
        };
    },
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
            data: []
        };
    },
    componentWillReceiveProps: function (nextProps) {
        var newProps = {};
        if (typeof nextProps.data != 'undefined') {
            newProps.data = nextProps.data;
        }
        if (typeof nextProps.value != 'undefined') {
            newProps.value = nextProps.value;
        }
        this.setState(newProps);
    },
    doEvent : function() {
        var _this = this;
        var node = ReactDOM.findDOMNode(this);
        var ul = $(node).find('ul');
        var li = ul.find('li');
        if (this.props.event == 'mouseenter') {
            $(node).bind(this.props.event, function () {
                (_this.state.data.length > 1 || _this.state.filter || (_this.props.className.indexOf('rui-theme-2') == -1)) && _this.startTimer(function () {
                    if (_this.state.active) {
                        _this.close();
                    } else {
                        _this.open();
                    }
                }, 200);
                _this.state.data.length > 3 && ul.css({
                    overflowY : 'scroll'
                });
            });
            $(node).bind('mouseleave', function () {
                if (_this.__timer) {
                    _this.stopTimer();
                    _this.onMouseLeave();
                }
            });
        } else {
            $(node).bind('mouseleave', function() {
                (_this.state.data.length > 1 || _this.state.filter || (_this.props.className.indexOf('rui-theme-2') == -1)) && _this.onMouseLeave();
            });
            $(node).bind(this.props.event, function () {
                if(_this.state.data.length > 1 || _this.state.filter || (_this.props.className.indexOf('rui-theme-2') == -1)) {
                    if (_this.state.active) {
                        _this.close();
                    } else {
                        _this.open();
                    }
                    _this.state.data.length > 3 && ul.css({
                        overflowY : 'scroll'
                    });
                }
            });
        }
    },
    componentDidMount: function () {
        var _this = this;
        var node = ReactDOM.findDOMNode(this);
        var ul = $(node).find('ul');
        var li = ul.find('li');
        _this.doEvent();
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
    handleClick: function (e) {
        var _this = this;
        (_this.state.data.length > 1 || _this.state.filter) && _this.close();
        _this.props.stuff && (_this.refs.choose.innerHTML = e.key);
        //_this._choose = e;
        this.setState({
            value:e
        });
        this.props.callback && this.props.callback(e);
    },
    handleFilter: function (source) {
        var _this = this, res;
        var reg = _this.props.reg || /.*/;
        var value = ReactDOM.findDOMNode(_this.refs.filter).value;
        var result;
        if (_this.props.filter) {
            if (reg.test(value)) {
                if (_this.props.filterCallback) {
                    result = _this.props.filterCallback(value);

                    if (result && result.length > 0) {
                        _this.setState({
                            data: result
                        })
                    } else {
                        _this.setState({
                            data: [{key: this.props.result, value: 'error'}]
                        })
                    }
                }
            } else {
                _this.setState({
                    data: [{key: this.props.result, value: 'error'}]
                })
            }
        }
    },
    _getChoose: function () {
        var _this = this;
        return _this._choose ? _this._choose : _this.state.value;
    },

    getValue: function () {
        return this._getChoose();
    },

    render: function () {

        var _this = this,
            active = this.state.active,
            data = this.state.data,
            deClass = className(this.props.className, this.getPropClass()),
            final = active ? deClass + ' active' : deClass,
            filter,
            filterAble = this.props.filter,
            offset = this.props.offset ? Number(this.props.offset) : '100%';
        if (filterAble) {
            filter = (
                <div className="filter">
                    <RUI.Input ref="filter" maxLength={_this.state.maxLen} onChange={_this.handleFilter} placeholder={_this.props.placeholder} />
                </div>
            );
        }

        var isSpecial = _this.state.data.length == 1 && _this.props.offset == '0';
        if(!isSpecial && this.props.className.indexOf('rui-theme-1') > -1 && typeof offset == 'number') {
            offset = offset - 5;
        }

        if(offset != '100%') {
            final += ' noactive';
        }

        return (

            <div ref="container" className={final}>
                <i className="arrow"></i>
                <span ref="choose" className="placeholder">{this.state.value.key}</span>

                <div className="rui-select-options-wrap" style={isSpecial ? {top:offset, zIndex:'1049'} : {top:offset}}>
                    <div ref="options" className={isSpecial? 'rui-select-options one' : 'rui-select-options'}>
                        {filter}
                        <ul>
                            {
                                data.map(function (item, index) {
                                    return <li
                                        className={(item.key == _this.state.value.key && !isSpecial) && "choosed"}
                                        onClick={item.value == 'error' ? null : _this.handleClick.bind(_this,item)}
                                        key={index}><a href="javascript:;">{item.key}</a></li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});