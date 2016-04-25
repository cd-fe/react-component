/**
 * 轮播图组件
 * @module controls/Slider
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import flatten from '../util/flatten.jsx';
import Swiper from 'swiper';

import 'swiper/dist/css/swiper.css';
import '../../css/slider.scss';

/**
 * 单个轮播页
 * @name Item
 * @static
 * @example
 * <RUI.Slider>
 *     <RUI.Slider.Item>your custom content</RUI.Slider.Item>
 * </RUI.Slider>
 */
var Slide = React.createClass({
    render: function () {
        return <div className="slider-item swiper-slide">
            {this.props.children}
        </div>;
    }
});

/**
 * 分页信息
 * @name Pagination
 * @static
 * @example
 * <RUI.Slider>
 *     <RUI.Slider.Pagination useClick={true} />
 * </RUI.Slider>
 */
var Pagination = React.createClass({
    getDefaultProps: function () {
        return {
            useClick: true
        };
    },
    render: function () {
        return <div className="swiper-pagination"></div>;
    }
});

/**
 * 左右操作按钮
 * @name NavigateButton
 * @static
 * @example
 * <RUI.Slider>
 *      <RUI.Slider.NavigateButton role="prev" />
 *      <RUI.Slider.NavigateButton role="next" />
 * </RUI.Slider>
 */
var NavigateButton = React.createClass({
    getDefaultProps: function () {
        return {
            role: 'hide'
        };
    },
    render: function () {
        return <div {...this.props} className={"swiper-button-"+this.props.role}></div>;
    }
});

var Slider = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default slider
             * @type string
             * @desc 组件名称
             */
            cname: 'slider',
            /**
             * @instance
             * @default 3000
             * @type number
             * @desc 自动播放间隔时间
             */
            autoplay: 3000,
            /**
             * @instance
             * @default 300
             * @type number
             * @desc 动画播放时长,更多配置参数，请直接传送swiper官方({@link http://idangero.us/swiper/api/})
             */
            speed: 300,
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 是否循环播放
             */
            loop: false
        };
    },
    componentDidMount: function () {
        this.updateSwiper();
    },
    componentDidUpdate: function () {
        this.updateSwiper();
    },
    getPagination: function () {
        return (Array.isArray(this.props.children) ? this.props.children : []).find(function (item) {
            if (item && item.type && item.type.displayName == 'Pagination') {
                return true;
            }
            return false;
        });
    },
    getButtons: function () {
        return (Array.isArray(this.props.children) ? this.props.children : []).filter(function (item) {
            if (item && item.type && item.type.displayName == 'NavigateButton') {
                return true;
            }
            return false;
        });
    },
    getSlides: function () {
        return flatten(Array.isArray(this.props.children) ? this.props.children : []).filter(function (item) {
            if (item.type && item.type.displayName == 'Slide') {
                return true;
            }
            return false;
        });
    },
    setControl: function (control) {
        this.control = control;
        this.updateSwiper();
    },
    getSwiperParams: function () {
        var current = {};

        var pagination = this.getPagination();
        if (pagination) {
            current.pagination = '.swiper-pagination';
            current.paginationClickable = pagination.props.useClick || false;
        }
        if (this.control) {
            current.control = this.control;
        }
        if (this.props.thumb) {
            current.slideToClickedSlide = true;
            current.centeredSlides = true;
            current.slidesPerView = 'auto';
            current.spaceBetween = 10;
            current.touchRatio = 0.2;
        }
        return Object.assign(current, this.props);
    },
    /**
     * 获取swiper插件创建的swiper实例
     * @instance
     * @return {object}
     */
    getSwiper: function () {
        return $(ReactDOM.findDOMNode(this)).data('react-swiper');
    },
    clearSwiper: function () {
        this.getSwiper() && (this.getSwiper().kill(), this.getSwiper().data('react-swiper', undefined));
    },
    updateSwiper: function () {
        var swiper = this.getSwiper();
        $(ReactDOM.findDOMNode(this)).data('react-swiper', $(ReactDOM.findDOMNode(this)).swiper(this.getSwiperParams()));
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        classes += ' swiper-container';
        if (this.props.thumb) {
            classes += ' swiper-thumb';
        }
        var props = require('../util/omit.jsx')(this.props, 'onClick');
        return <div {...props} className={classes}>
            <div className={"swiper-wrapper"}>
                {this.getSlides()}
            </div>
            {this.getPagination()}
            {this.getButtons()}
        </div>;
    }
});

Slider.Item = Slide;
Slider.Pagination = Pagination;
Slider.NavigateButton = NavigateButton;

module.exports = Slider;