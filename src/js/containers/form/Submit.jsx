module.exports = React.createClass({
    clickHandler:function() {
        this.props.form && this.props.form.submit();
    },
    render:function() {
        return <RUI.Button className="primary" onClick={this.clickHandler}>{this.props.children || '保存'}</RUI.Button>;
    }
});