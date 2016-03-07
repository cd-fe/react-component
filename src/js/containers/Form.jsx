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
            cname:'form',
            onSubmit:function() {
                return true;
            }
        };
    },
    serializeArray:function() {

    },
    serializeObject:function() {

    },
    submitHandler:function(e) {
        var result = this.props.onSubmit(this.serializeObject());
        if(result === false) {
            e.nativeEvent.preventDefault();
        }
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