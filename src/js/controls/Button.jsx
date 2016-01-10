import className from '../util/className.jsx';
import PropClassMixin from '../mixins/PropClassMixin.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import EventDispatcher from '../mixins/EventDispatcher.jsx';

import '../../css/button.scss';

module.exports = React.createClass({
    mixins:[PropClassMixin, EventDispatcher, ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'button'
        };
    },
    render:function() {
        return <a {...this.props} className={className(this.props.className, this.getPropClass())}>{this.props.children}</a>
    }
});