module.exports = React.createClass({
    clickHandler:function() {
        this.props.form && this.props.form.reset();
    },
    render:function() {
        return <RUI.Button onClick={this.clickHandler}>{this.props.children || '重置'}</RUI.Button>;
    }
});