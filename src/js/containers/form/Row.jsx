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
    contextTypes: {
        form : React.PropTypes.object
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        var controlRule = this.context.form.props.rules[this.props.type];
        return (
            <div {...this.props} className={classes}>
                <label className={"rui-form-label"}>{controlRule && controlRule.required ?  (<i className="required">*</i>) : null}<span>{this.props.label}</span></label>
                <div className={"rui-form-content"}>
                    {this.props.children}
                </div>
            </div>
        )
    }
});



module.exports = Row;
