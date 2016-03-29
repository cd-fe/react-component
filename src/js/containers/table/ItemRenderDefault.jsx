import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            label:this.props.label
        };
    },
    getDefaultProps:function() {
        return {
            fieldFunction:function(val) {
                return val ? val.toString() : "";
            }
        };
    },
    setData:function(data, field) {
        this.setState({
            label:this.props.fieldFunction(eval(`(data['${field.split('.').join('\'][\'')}'])`), data),
            data:data
        });
    },
    render:function() {
        return <span {...this.props} style={{lineHeight:this.props.itemHeight}}>
            {this.state.label || ""}
        </span>;
    }
});

// {this.props.children ? (this.props.children instanceof Array ? this.props.children : [this.props.children]).map(function(child, index) {
//    var resultProps = {
//        key:index
//    };
//    for(var key in child.props) {
//        if(child.props.hasOwnProperty(key)) {
//            if(typeof child.props[key] == 'function') {
//                var func = child.props[key].bind(null, _this.props.source);
//                resultProps[key] = func;
//            }else {
//                resultProps[key] = child.props[key];
//            }
//        }
//    }
//
//    return React.cloneElement(child, resultProps);
//}) : this.props.fieldFunction(this.props.value, this.props.source)}