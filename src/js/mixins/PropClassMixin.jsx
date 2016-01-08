import constant from '../constant.jsx';

module.exports = {
    getPropClass:function() {
        var classes = [];

        classes.push(constant.classPrefix + this.props.cname);

        return classes;
    }
};