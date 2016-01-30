module.exports = function(component) {
    return React.createClass({
        getInitialState:function() {
            return {
                instance:null
            };
        },
        componentDidMount:function() {
            component(function(instance) {
                this.setState({
                    instance:instance
                });
            }.bind(this));
        },
        render:function() {
            if(this.state.instance) {
                var Instance = this.state.instance;
                return <Instance {...this.props} />;
            }else {
                return <div>Loading...</div>;
            }
        }
    });
};