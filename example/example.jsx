import Button from '../src/js/controls/Button.jsx';
import Input from '../src/js/controls/Input.jsx';
import Pagination from '../src/js/controls/Pagination.jsx';

var Test = React.createClass({
    getInitialState:function() {
        return {
            input_value:"123"
        };
    },
    inputChange:function() {
        console.log('input change');
    },
    componentDidMount:function() {
        setTimeout(function() {
            this.setState({
                input_value:999
            });
        }.bind(this), 3000);
    },
    render:function() {
        return <div>
            <Button>测试</Button>
            <br/>
            <Input value={this.state.input_value} onChange={this.inputChange} />
            <br/>
            <Pagination pageSize="10" currentPage="5" totalNum="78" />
        </div>;
    }
});

ReactDOM.render(<Test />, document.getElementById('wrapper'));