import constant from '../constant.jsx';

module.exports = {
    getPropClass:function() {
        var classes = [];

        classes.push(this.getDefaultClass());

        if(this.props.shadow) {
            classes.push('shadow');
        }
        if(this.props.radius) {
            classes.push('radius');
        }
        if(this.props.disable) {
            classes.push('disable');
        }

        return classes.join(' ');
    },
    getDefaultClass:function() {
        return constant.classPrefix + this.props.cname;
    }
};