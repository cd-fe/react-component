import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/button.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'button',
            disable:false
        };
    },
    clickHandler:function(e) {
        if(!this.props.disable) {
            this.dispatchEvent('click', e);
        }
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        var props = require('../util/omit.jsx')(this.props, 'onClick');
        return <a {...props} onClick={this.clickHandler} className={classes}>{this.props.children}</a>
    }
});