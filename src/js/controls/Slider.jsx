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
    updateSwiper:function() {
        if(!this.swiper) {
            this.swiper = $(ReactDOM.findDOMNode(this)).swiper(Object.assign({}, this.props));
            this.swiper = Swiper.call(Swiper, ReactDOM.findDOMNode(this), Object.assign({}, this.props));
        }
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        classes += ' swiper-container';
        var props = require('../util/omit.jsx')(this.props, 'onClick');
        return <div {...props} className={classes}>
            <div className={"swiper-wrapper"}>
                {this.props.children}
            </div>
        </div>;
    }
});

Slider.Item = Slide;

module.exports = Slider;