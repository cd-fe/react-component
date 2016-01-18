import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/button.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'button'
        };
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        return <a {...this.props} className={classes}>{this.props.children}</a>
    }
});