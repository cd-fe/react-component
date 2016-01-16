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
        var args = arguments;
        var e = args[0];
        var offset;
        var left;
        var top;
        var selfHeight;
        var selfWidth;
        var target;
        if(type == 'follow') {
            target = $(e.target);
            offset = target.offset();
            left = target.outerWidth();
            top = target.outerHeight();
            selfHeight = $(node).height();
            node.style.position = 'absolute';
            node.style.left = offset.left + left + 'px';
            node.style.top = (offset.top + parseInt((top-selfHeight) / 2)) + 'px';

        }else if(type == 'partial-screen') {
            target = $('[data-id='+ args[0] + ']');
            if(target.size() > 0) {
                offset = target.offset();
                left = target.outerWidth();
                top = target.outerHeight();
                selfHeight = $(node).height();
                selfWidth = $(node).width();
                node.style.position = 'absolute';
                node.style.left = (offset.left + parseInt((left - selfWidth)/2)) + 'px';
                node.style.top = (offset.top + parseInt((top-selfHeight) / 2)) + 'px';
            }
        }
        _this.setState({
            active : true,
            show : this.props.mask
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