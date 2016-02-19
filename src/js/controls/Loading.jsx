import className from '../util/className.jsx';
import OverlayMixin from '../mixins/OverlayMixin.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import '../../css/loading.scss';
module.exports = React.createClass({
    mixins: [ComponentBase,OverlayMixin],
    getInitialState:function() {
        return {
            active : false,
            show : false,//overlay,只有type类型为full-screen时才生效[true,false]
            type : this.props.type,//loading类型 ['follow','partial-screen','full-screen']
            size : this.props.size,//loading图标的大小['middle','small']
            mask : this.props.mask
        };
    },
    open : function() {
        var _this = this;
        var node = ReactDOM.findDOMNode(_this);
        var type = _this.props.type;
        var e = arguments[0];
        _this.doOpen(node, e, type);
        _this.setState({
            active : true,
            show : this.props.mask
        });
    },
    doOpen : function() {
        var _this = this;
        var loader = arguments[0];//loading元素
        var loaderTrigger = $(arguments[1] ? arguments[1].target || arguments[1].currentTarget.target : 'body');//触发loading元素
        var loaderType = arguments[2];//loading类型
        var originPos;
        if(loaderType == 'follow') {
            _this.setPos(loaderTrigger, loader);
            _this.resize(loaderTrigger, loader);
        }
    },
    setPos : function(trigger, loader) {
        var offset, tiggerWidth, triggerHeight, loaderWidth, loaderHeight, originLeft, originTop;
        offset = trigger.offset();
        tiggerWidth = trigger.outerWidth();
        triggerHeight = trigger.outerHeight();
        loaderHeight = $(loader).height();
        loader.style.position = 'fixed';
        loader.style.left = offset.left + tiggerWidth + 'px';
        loader.style.top = (offset.top + parseInt((triggerHeight-loaderHeight) / 2)) + 'px';
        return {
            originLeft : offset.left + tiggerWidth,
            originTop : offset.top + parseInt((triggerHeight-loaderHeight) / 2)
        };
    },
    resize : function(trigger, loader) {
        var _this = this;
        var body,sLeft,sTop,pos;
        $(window).bind('scroll', function() {
            body = $('body');
            sLeft = body.scrollLeft();
            sTop = body.scrollTop();
            pos = _this.setPos(trigger, loader);
            loader.style.left = pos.originLeft - sLeft + 'px';
            loader.style.top = pos.originTop - sTop + 'px';
        });
        $(window).bind('resize', function() {
            _this.setPos(trigger, loader);
        });
    },
    close : function() {
        var _this = this;
        _this.setState({
            active : false,
            show : false
        });
    },
    getDefaultProps:function() {
        return  {
            cname : "loading"
        };
    },
    render : function() {
        var _this = this;
        var type = _this.props.type || '';
        var size = _this.props.size || '';
        var classes = className(size, className(type, _this.getPropClass()));
        var options = (this.props.type == 'follow') && (<span className="load-txt">&nbsp;正在提交数据...</span>);
        return(
            <div className={classes} style={{display:this.state.active ? 'block' : 'none'}}>
                <span className="load-icon"></span>
                {options}
            </div>
        )
    }
});