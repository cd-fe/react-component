import ComponentBase from '../mixins/ComponentBase.jsx';
import className from '../util/className.jsx';
import Control from './form/Control.jsx';
import Reset from './form/Reset.jsx';
import Submit from './form/Submit.jsx';

import '../../css/form.scss';

var Form = React.createClass({
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return {
            cname:'form'
        };
    },
    submitHandler:function(e) {

    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());
        return <form {...this.props} className={classes} onSubmit={this.submitHandler}>
            {this.props.children}
        </form>;
    }
});

Form.Control = Control;
Form.Submit = Submit;
Form.Reset = Reset;

module.exports = Form;