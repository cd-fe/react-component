module.exports = React.createClass({
    componentWillMount:function() {
        if(this.props.children instanceof Array && this.props.children.length > 1) {
            console.warn('Render children must be just one component.');
        }
    },
    setData:function(data) {
        this.setState(data);
    },
    render:function() {
        var child = this.props.children instanceof Array ? this.props.children[0] : this.props.children;
        var props = {};
        for(var key in this.props) {
            if(key != 'children') {
                if(typeof this.props[key] == 'function') {
                    props[key] = this.props[key].bind(this, this.state);
                }else {
                    props[key] = this.props[key];
                }
            }
        }

        props.className = (props.className || "") + ' ' + (this.props.selected && 'selected');

        return <div>
            {React.cloneElement(child, props)}
        </div>;
    }
});