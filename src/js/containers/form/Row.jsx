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
            cname:'row'
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
                {React.Children.map(this.props.children, function(child, index) {
                    console.log('length',this.props.children);
                    var props = Object.assign({
                        form:this.props.form,
                        index:this.props.index + index,
                        ref:['control',this.props.index ,index].join('_'),
                        //validateStatus : this.props.form.validateStatus[this.props.index][index]
                    }, child.props);
                    return React.cloneElement(child, props);
                }.bind(this))}
            </div>
        )
    }
});

module.exports = Row;