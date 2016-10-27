/**
 * 表单行组件
 * @module containers/form/Row
 */

import ComponentBase from '../../mixins/ComponentBase.jsx';

import omit from '../../util/omit.jsx';
import className from '../../util/className.jsx';
var Row = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            /**
             * @instance
             * @default control
             * @type string
             * @desc 组件名称r
             */
            cname:'row',
            label:" ",
            required:false
        };
    },
    getValue:function() {
       return Object.keys(this.refs).map(function(ref) {
            return this.refs[ref];
       }.bind(this));
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        return (
            <div {...this.props} className={classes}>
                <label className={"rui-form-label"}>{this.props.required ?  (<i className="required">*</i>) : null}<span>{this.props.label}</span></label>
                <div className={"rui-form-content"}>
                    {this.props.children}
                </div>
            </div>
        )
    }
});

//{React.Children.map(this.props.children, function(child, index) {
//    var props = Object.assign({
//        form:this.props.form,
//        ref:['Control',this.props.index ,index].join('_'),
//        mark : ['Control',this.props.index ,index].join('_')
//        //validateStatus : this.props.form.validateStatus[this.props.index][index]
//    }, child.props);
//    return React.cloneElement(child, props);
//}.bind(this))}

module.exports = Row;
