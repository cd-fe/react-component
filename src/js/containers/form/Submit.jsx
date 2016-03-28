module.exports = React.createClass({
    setForm:function(form) {
        this.form = form;
    },
    clickHandler:function() {
        this.form && this.form.submit();
    },
    render:function() {
        return <a type="submit" className="rui-button primary" onClick={this.clickHandler}>{this.props.children || '提交'}</a>;
    }
});