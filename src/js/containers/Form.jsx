import Control from './form/Control.jsx';
import Reset from './form/Reset.jsx';
import Submit from './form/Submit.jsx';

var Form = React.createClass({
    render:function() {
        return <form {...this.props}>
            {React.Children.map(this.props.children, function(child) {
                return child;
            })}
        </form>;
    }
});

Form.Control = Control;
Form.Submit = Submit;
Form.Reset = Reset;

module.exports = Form;