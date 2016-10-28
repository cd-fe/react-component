/**
 * 日历组件
 * @module controls/DatePicker
 */

import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Input from './Input.jsx';
import Calendar from './datepicker/Calendar.jsx';
import Button from './Button.jsx';
import Icon from './Icon.jsx';

import DateFormatter from '../formatters/DateFormatter.jsx';

import '../../css/datepicker.scss';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getInitialState: function () {
        var status = {
            popup: false,
            value: this.props.value
        };
        if (status.value) {
            status.startValue = this.props.startValue || this.props.value;
            status.endValue = this.props.endValue || this.props.value + 86400 * 1000;
            status.startValuePreview = this.props.startValue || this.props.value;
            status.endValuePreview = this.props.endValue || this.props.value + 86400 * 1000;
        }
        return status;
    },
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default datepicker
             * @type string
             * @desc 组件名称
             */
            cname: 'datepicker',
            /**
             * @instance
             * @default null
             * @type number
             * @desc 需要显示时间的时间戳
             * @example
             * Date.now()
             * 1460600493335
             */
            value: null,
            /**
             * @instance
             * @default null
             * @type number
             * @desc 范围选取时间中的开始时间，当开始时间未设置时，默认使用value作为开始时间
             */
            startValue: null,
            /**
             * @instance
             * @default null
             * @type number
             * @desc 范围选取时间中的结束时间，当结束时间未设置时，默认使用开始时间后一天作为结束时间
             */
            endValue: null,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否使用日期范围模式
             */
            range: false,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否显示时间设置，showTime为true时，会覆盖range，也就是显示时间时，没有范围选取模式
             */
            showTime: false,
            /**
             * @instance
             * @default null
             * @type object
             * @desc 显示时间的格式化类，该时间格式类的显示规则将会覆盖原有的显示内容，例如时间显示
             * @see {@link module:formatters/DateFormatter}
             * @example
             * <RUI.DatePicker formatter={new DateFormatter("Y年m月d号")} />
             */
            formatter: null,
            /**
             * @instance
             * @default null
             * @type function
             * @desc 当时间变更时，发布一个change事件，事件内的data属性，为变更后的时间戳
             * @example
             * changeHandler:function(event) {
             *      // event.data 的值与 getValue() 方法一致
             *      // event.data === instance.getValue()
             * }
             */
            onChange: null
        };
    },
    /**
     * 获取修改后的时间戳
     * @instance
     * @returns {number}
     * @desc 当props.range为真时，返回包括开始和结束时间的对象，否则仅返回单个时间
     * @example
     * return {
     *      startValue:1460600493335,
     *      endValue:1460600493335
     * };
     * return 1460600493335;
     */
    getValue: function () {
        if (this.props.range) {
            return {
                startValue: this.state.startValue,
                endValue: this.state.endValue
            };
        }
        return this.state.value;
    },
    /**
     * 设置组件的时间戳
     * @instance
     * @param {number|object} opt
     * @desc 设置当前组件显示的时间内容，在props.range为真时，需要传入一个object
     * @example
     * instance.setValue(1460600493335);
     * instance.setValue({
     *      startValue:1460600493335,
     *      endValue:1460600493335
     * });
     */
    setValue: function (opt) {
        if (!this.props.range) {
            this.setState(typeof opt == 'object' ? opt : {
                value:opt,
                valuePreview:opt
            });
        }
        else {
            this.setState({
                startValue: opt.startValue,
                endValue: opt.endValue,
                startValuePreview: opt.startValue,
                endValuePreview: opt.endValue
            });
        }
    },
    componentDidUpdate: function () {
        $('body').unbind('mousedown', this.hidePopup);
        if (this.state.popup) {
            $('body').bind('mousedown', this.hidePopup);
        }
    },
    componentWillReceiveProps: function (newProps) {
        var update = {};
        if (newProps.value) {
            update.value = newProps.value;
        }
        if (newProps.startValue) {
            update.startValue = newProps.startValue;
            update.startValuePreview = newProps.startValue;
        }
        if (newProps.endValue) {
            update.endValue = newProps.endValue;
            update.endValuePreview = newProps.endValue;
        }

        this.setState(update);
    },
    togglePopup: function () {
        this.setState({
            popup: !this.state.popup,
            value: this.state.value || Date.now(),
            startValue: this.state.startValue || Date.now(),
            endValue: this.state.endValue || Date.now()
        }, function() {
            var rootDom = $(ReactDOM.findDOMNode(this));
            var offset = rootDom.offset().top - window.scrollY;
            var resultHeight = $(window).height() - offset - 38;
            if(resultHeight < rootDom.find('.rui-datepicker-popup').height()) {
                rootDom.addClass('upside');
            }else {
                rootDom.removeClass('upside');
            }
        }.bind(this));
    },
    hidePopup: function (e) {
        var target = e.target;
        var sameParent = false;
        var parent = ReactDOM.findDOMNode(this);

        while (target) {
            if (target === parent) {
                sameParent = true;
                break;
            }
            target = target.parentNode;
        }

        if (!sameParent) {
            this.setState({
                popup: false
            });
        }
    },
    onCalendarChange: function (event) {
        if (this.props.range || this.props.showTime) {
            this.setState({
                value: event.data,
                valuePreview: event.data
            }, function () {
                this.dispatchEvent('change', this.getValue());
            }.bind(this));
        } else {
            this.setState({
                value: event.data,
                popup: false
            }, function () {
                this.dispatchEvent('change', this.getValue());
            }.bind(this));
        }
    },
    startCalendarChange: function (event) {
        this.setState({
            startValue: event.data,
            startValuePreview: event.data,
            endValue: this.state.endValue,
            endValuePreview: this.state.endValuePreview || this.state.endValue
        }, ()=>this.dispatchEvent('change', this.getValue()));
    },
    endCalendarChange: function (event) {
        this.setState({
            endValue: event.data,
            endValuePreview: event.data,
            startValue: this.state.startValue,
            startValuePreview: this.state.startValuePreview || this.state.startValue
        }, ()=>this.dispatchEvent('change', this.getValue()));
    },
    rangeCalendarCancel: function () {
        this.setState({
            popup: false
        });
    },
    rangeCalendarSave: function () {
        this.setState({
            startValue: this.state.startValuePreview,
            endValue: this.state.endValuePreview,
            popup: false
        }, function () {
            this.dispatchEvent('change', this.getValue());
        }.bind(this));
    },
    timeCalendarSave: function (time) {
        this.setState({
            value: time,
            valuePreview: time,
            popup: false
        }, function () {
            this.dispatchEvent('change', this.getValue());
        }.bind(this));
    },
    onStartTimeBlur:function(event) {
        var time = Date.parse(event.target.value);
        this.setState({
            startValuePreview:isNaN(time) ? this.state.startValuePreview : time
        });
    },
    onEndTimeBlur:function(event) {
        var time = Date.parse(event.target.value);
        this.setState({
            endValuePreview:isNaN(time) ? this.state.endValuePreview : time
        });
    },
    dateNow: function (time) {
        var date = new Date(time);
        if (!this.props.showTime) {
            date.setHours(0);
            date.setSeconds(0);
            date.setMinutes(0);
            date.setMilliseconds(0);
        }
        return date.getTime();
    },
    display: function (type) {
        var formatter = (this.props.formatter || new DateFormatter(this.props.showTime ? "Y-m-d  H:i:s" : "Y-m-d"));
        if (type) {
            if (type == 'start' && this.state.startValuePreview) {
                return formatter.format(this.state.startValuePreview);
            }
            if (type == 'end' && this.state.endValuePreview) {
                return formatter.format(this.state.endValuePreview);
            }

            return "";
        }
        else if (this.props.range) {
            if (!this.state.startValue || !this.state.endValue) {
                return "";
            }
            return formatter.format(this.state.startValue) + '  -  ' + formatter.format(this.state.endValue);
        }
        else if (this.props.showTime) {
            if (!this.state.value /*this.state.popup*/) {
                return undefined;
            }
            if (!this.state.value) {
                return "";
            }
            return formatter.format(this.state.value);
        } else {
            if (!this.state.value) {
                return "";
            }
            return formatter.format(this.state.value);
        }
    },
    render: function () {
        var defaultClass = this.getDefaultClass();
        var classes = className(this.props.className, this.getPropClass());
        if (this.state.popup) {
            classes += ' active';
        }
        if (this.props.range) {
            classes += ' range';
        }
        if (this.props.showTime) {
            classes += ' timestatus';
        }

        return <div className={classes}>
            <Input mode="static" value={this.display()} onClick={this.togglePopup} placeholder="请选择日期"/>
            <Icon name="calendar" style={{position:'absolute',right:'10px',top:'6px'}} />

            <div className={defaultClass+'-popup'}>
                {/*this.props.range && (<div className={defaultClass+'-row'}>
                 <div className={"range-container"}>
                 <div className={"left"}>
                 <span>开始时间： </span><Input value={this.display('start')} onBlur={this.onStartTimeBlur}/>
                 <span className="end">结束时间： </span><Input value={this.display('end')} onBlur={this.onEndTimeBlur}/>
                 </div>
                 <div className={"right"}>
                 <Button onClick={this.rangeCalendarCancel}>取消</Button>
                 <Button onClick={this.rangeCalendarSave} className="primary">保存</Button>
                 </div>
                 </div>
                 </div>)*/}
                <div className={defaultClass+'-row'} style={{height:this.props.showTime ? 275 : 'auto'}}>
                    {this.props.range ? (
                        <div className={defaultClass+'-row-range'}>
                            <Calendar source={{start:this.state.startValuePreview, end:this.state.endValuePreview}}
                                      value={this.state.startValuePreview || this.dateNow(Date.now())}
                                      onChange={this.startCalendarChange} range={"start"} showTime={this.props.showTime}/>
                            <Calendar source={{start:this.state.startValuePreview, end:this.state.endValuePreview}}
                                      value={this.state.endValuePreview || (this.dateNow(Date.now() + (this.props.showTime ? 1000 : 86400 * 1000)))}
                                      onChange={this.endCalendarChange} range={"end"} showTime={this.props.showTime}/>
                        </div>
                    ) : (
                        <Calendar
                            value={this.state.valuePreview || this.dateNow(Date.now())}
                            onChange={this.onCalendarChange}
                            showTime={this.props.showTime}
                            onCancel={this.rangeCalendarCancel}
                            onSave={this.timeCalendarSave}
                            />
                    )}
                </div>
            </div>
            {this.props.children}
        </div>
    }
});