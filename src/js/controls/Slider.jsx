import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import Swiper from 'swiper';

import 'swiper/dist/css/swiper.css';
import '../../css/slider.scss';

var Slide = React.createClass({
    render:function() {
        return <div className="slider-item swiper-slide">
            {this.props.children}
        </div>;
    }
});

var Pagination = React.createClass({
    getDefaultProps:function() {
        return {
            useClick:true
        };
    },
    render:function() {
        return <div className="swiper-pagination"></div>;
    }
});

var NavigateButton = React.createClass({
    getDefaultProps:function() {
        return {
            role:'hide'
        };
    },
    render:function() {
        return <div {...this.props} className={"swiper-button-"+this.props.role}></div>;
    }
});

var Slider = React.createClass({
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'slider',
            autoplay:3000,
            speed:300,
            loop:true
        };
    },
    componentDidMount:function() {
        this.updateSwiper();
    },
    componentDidUpdate:function() {
        this.updateSwiper();
    },
    getPagination:function() {
        return (Array.isArray(this.props.children) ? this.props.children : []).find(function(item) {
            if(item && item.type && item.type.displayName == 'Pagination') {
                return true;
            }
            return false;
        });
    },
    getButtons:function() {
        return (Array.isArray(this.props.children) ? this.props.children : []).filter(function(item) {
            if(item && item.type && item.type.displayName == 'NavigateButton') {
                return true;
            }
            return false;
        });
    },
    getSlides:function() {
        return (Array.isArray(this.props.children) ? this.props.children : []).filter(function(item) {
            if(item.type && (item.type.displayName != 'Pagination' || item.type.displayName != 'NavigateButton')) {
                return false;
            }
            return true;
        });
    },
    getSwiperParams:function() {
        var current = {};

        var pagination = this.getPagination();
        if(pagination) {
            current.pagination = '.swiper-pagination';
            current.paginationClickable = pagination.props.useClick || false;
        }
        return Object.assign(current, this.props);
    },
    getSwiper:function() {
        return $(ReactDOM.findDOMNode(this)).data('react-swiper');
    },
    clearSwiper:function() {
        this.getSwiper() && (this.getSwiper().kill(), this.getSwiper().data('react-swiper', undefined));
    },
    updateSwiper:function() {
        var swiper = this.getSwiper();
        if(swiper) {
            this.clearSwiper();
        }
        $(ReactDOM.findDOMNode(this)).data('react-swiper', $(ReactDOM.findDOMNode(this)).swiper(this.getSwiperParams()));
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        classes += ' swiper-container';
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