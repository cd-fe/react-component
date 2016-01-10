import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/tooltip.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {

        };
    },
    getDefaultProps:function() {
        return  {
            cname:"tooltip"
        };
    },
    componentWillReceiveProps:function(props) {

    },
    render:function() {
        var allname = className(this.props.className, this.getPropClass());
        var prefix = this.getDefaultClass();
        return <div className={allname}>
            {this.props.children}
        </div>
    }
});