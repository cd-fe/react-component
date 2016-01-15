import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import TimerMixin from '../mixins/TimerMixin.jsx';
import '../../css/select.scss';
module.exports = React.createClass({
   mixins: [ComponentBase,TimerMixin],
   _choose: null,
   getInitialState:function() {
        return {
            active : false,
            filter : false,//过滤筛选
            event : this.props.event,//事件类型mousover,click,dbclick
            data : this.props.data,//数据
            value : this.props.value,//默认值
            stuff : this.props.stuff,//选中值填充
            callback : this.props.callback,//回调
            offset : this.props.offset
        };
   },
   getDefaultProps:function() {
        return  {
            cname : "select",
            event : "mouseenter"
        };
   },
   componentDidMount:function() {
       var _this = this;
       var node = ReactDOM.findDOMNode(this);
       $(node).bind('mouseleave', this.onMouseLeave);
       $(node).bind(this.props.event, function() {
           if(_this.state.active) {
               _this.close();
           }else {
               _this.open();
           }

       });
   },
   onMouseLeave : function() {
       this.close();
   },
   open : function() {
       var _this = this;
       var options = this.refs.options;
       options.style.display = 'block';
       setTimeout(function(){
           _this.setState({
               active : true
           });
       },10);

   },
   close : function() {
       var _this = this;
       var options = _this.refs.options;
       _this.setState({ active: false });
       setTimeout(function(){
           if (_this.state.active === false) {
               options.style.display = 'none';
           }
       },100);
   },
   handleClick : function(e) {
       var _this = this;
       _this.close();
       _this.props.stuff && (_this.refs.choose.innerHTML = e.key);
       _this._choose = e;
       this.props.callback && this.props.callback(e);
   },
   handleFilter : function(source) {
       var _this = this, res;
       if(_this.props.filter) {
           res =  _this.props.filterCallback();
       }
       _this.setState({
           data : res
       });
   },
   _getChoose : function() {
       var _this = this;
       return _this._choose ? _this._choose : _this.props.value;
   },
   render : function() {
      var _this = this,
      active = this.state.active,
      data = this.state.data,
      deClass = className(this.props.className, this.getPropClass()),
      final = active ? deClass + ' active' : deClass,
      filter,
      filterAble = this.props.filter,
      offset = this.props.offset ? this.props.offset : '100%';
      if(filterAble) {
           filter = (
               <div className="filter" ref="filter" onChange={this.handleFilter}>
                   <input type="text" />
               </div>
           );
       }
        return(

            <div ref="container" className={final}>
                <i className="arrow"></i>
                <span ref="choose" className="placeholder">{this.props.value.key}</span>
                <div className="rui-select-options-wrap" style={{top:offset}}>
                    <div ref="options" className="rui-select-options">
                        {filter}
                        <ul>
                            {
                               data.map(function(item, index) {
                                    return <li onClick={_this.handleClick.bind(_this,item)}><a href="javascript:;">{item.key}</a></li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
   }
});