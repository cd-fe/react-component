module.exports = React.createClass({
    setForm:function(form) {
        this.form = form;
    },
    clickHandler:function() {
        this.form && this.form.submit();
    },
    render:function() {
        return <RUI.Button className="primary" onClick={this.clickHandler}>{this.props.children || '保存'}</RUI.Button>;
    }
});