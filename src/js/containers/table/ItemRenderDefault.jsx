import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {};
    },
    getDefaultProps:function() {
        return {
            cname:'table-column-item',
            fieldFunction:function(val) {
                return val;
            }
        };
    },
    render:function() {
        var _this = this;
        var classes = className(this.props.className, this.getPropClass());
        return <li {...this.props} className={classes}>
            {this.props.children ? (this.props.children instanceof Array ? this.props.children : [this.props.children]).map(function(child, index) {
                var resultProps = {
                    key:index
                };
                for(var key in child.props) {
                    if(child.props.hasOwnProperty(key)) {
                        if(typeof child.props[key] == 'function') {
                            var func = child.props[key].bind(null, _this.props.source);
                            resultProps[key] = func;
                        }else {
                            resultProps[key] = child.props[key];
                        }
                    }
                }

                return React.cloneElement(child, resultProps);
            }) : this.props.fieldFunction(this.props.value, this.props.source)}
        </li>;
    }
});