import Dialog from '../controls/Dialog.jsx';

module.exports = {
    __instance:null,
    createContainer:function() {
        var exist = document.getElementById('dialog-container');
        if(!exist) {
            var container = document.createElement('div');
            container.setAttribute('id', 'dialog-container');
            document.body.appendChild(container);
        }

        var DialogManager = React.createClass({
            getInitialState:function() {
                return {
                    alertMessage:"",
                    alertTitle:"",
                    confirmTitle:"",
                    confirmMessage:"",
                    confirmSubmit:null
                }
            },
            showAlert:function(opt) {
                this.setState({
                    alertMessage:opt.message,
                    alertTitle:opt.title
                }, function() {
                    this.refs.alert.show();
                }.bind(this));
            },
            showConfirm:function(opt) {
                this.setState({
                    confirmMessage:opt.message,
                    confirmTitle:opt.title,
                    confirmSubmit:opt.submit
                }, function() {
                    this.refs.confirm.show();
                }.bind(this));
            },
            render:function() {
                return <div>
                    <Dialog ref="alert" title={this.state.alertTitle} buttons={'submit'} style={{'min-width':'200px'}}>{this.state.alertMessage}</Dialog>
                    <Dialog ref="confirm" title={this.state.confirmTitle} buttons={'cancel,submit'} onSubmit={this.state.confirmSubmit}>
                        {this.state.confirmMessage}
                    </Dialog>
                </div>
            }
        });

        var instance = ReactDOM.render(<DialogManager />, document.getElementById('dialog-container'));
        this.__instance = instance;
    },
    alert:function(opt, title) {
        if(typeof opt == 'string') {
            opt = {
                message:opt,
                title:title
            };
        }

        this.getInstance().showAlert(opt);
    },
    confirm:function(opt, title, callback) {
        if(typeof opt == 'string') {
            opt = {
                message:opt,
                title:title || "",
                submit:callback || null
            };
        }

        this.getInstance().showConfirm(opt);
    },
    getInstance:function() {
        if(!this.__instance) {
            this.createContainer();
        }

        return this.__instance;
    }
};