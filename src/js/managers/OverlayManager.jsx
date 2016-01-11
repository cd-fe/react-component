module.exports = {
    __overlay:null,
    createOverlay:function() {
        var exist = document.getElementById('overlay-container');
        if(!exist) {
            var container = document.createElement('div');
            container.setAttribute('id', 'overlay-container');
            document.body.appendChild(container);
        }

        var Overlay = React.createClass({
            getInitialState:function() {
                return {
                    show:false
                };
            },
            show:function() {
                this.setState({
                    show:true
                });
            },
            hide:function() {
                this.setState({
                    show:false
                });
            },
            render:function() {
                return <div className="overlay" style={{display:this.state.show ? 'block' : 'none'}}></div>
            }
        });

        var instance = ReactDOM.render(<Overlay />, document.getElementById('overlay-container'));
        this.__overlay = instance;
    },
    getInstance:function() {
        if(!this.__overlay) {
            this.createOverlay();
        }

        return this.__overlay;
    }
};