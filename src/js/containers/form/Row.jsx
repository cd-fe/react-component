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
        var controlRule = this.props.rule[this.props.type];
        return (
            <div {...this.props} className={classes}>
                <label className={"rui-form-label"}>{this.props.required ?  (<i className="required">*</i>) : null}<span>{this.props.label}</span></label>
                <div className={"rui-form-content"}>
                    {React.Children.map(this.props.children, function(child, index) {
                        var props = Object.assign({
                            index : this.props.index,
                            sub : index,
                            rule : (controlRule && controlRule.validator&&controlRule.validator[index].rules) || ''
                        }, child.props);
                        return React.cloneElement(child, props);
                    }.bind(this))}
                </div>
            </div>
        )
    }
});



module.exports = Row;
