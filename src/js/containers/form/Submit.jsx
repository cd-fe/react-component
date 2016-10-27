/**
 * 表单提交按钮
 * @module containers/form/Submit
 */

module.exports = React.createClass({
    contextTypes:{
        form:React.PropTypes.object
    },
    clickHandler:function() {
        this.context.form && this.context.form.submit();
    },
    render:function() {
        return <RUI.Button className="primary" onClick={this.clickHandler}>{this.props.children || '保存'}</RUI.Button>;
    }
});