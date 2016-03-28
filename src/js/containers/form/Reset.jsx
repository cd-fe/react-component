module.exports = React.createClass({
    setForm:function(form) {
        this.form = form;
    },
    clickHandler:function() {
        this.form && this.form.reset();
    },
    render:function() {
        return <RUI.Button onClick={this.clickHandler}>{this.props.children || '重置'}</RUI.Button>;
    }
});