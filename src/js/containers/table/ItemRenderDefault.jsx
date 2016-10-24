import className from '../../util/className.jsx';
import ComponentBase from '../../mixins/ComponentBase.jsx';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            fieldFunction:function(val) {
                return val ? val.toString() : "";
            }
        };
    },
    render:function() {
        var field = this.props.field;
        var index = this.props.index;
        var data = this.props.data;
        var fieldValue = typeof field == 'undefined' ? data : eval(`(data['${(field+"").split('.').join('\'][\'')}'])`);
        return <span {...this.props}>
            {this.props.fieldFunction(fieldValue, data, index) || ""}
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