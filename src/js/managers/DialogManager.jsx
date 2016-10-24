import Dialog from '../controls/Dialog.jsx';

/**
 * 弹出层管理类
 * @module managers/DialogManager
 */

module.exports = {
    __instance:null,
    __autohide:true,
    /**
     * 清除所有弹出层
     * @static
     * @member
     */
    clearAll:function() {
        if(this.__instance) {
            this.__instance.hideAll();
        }
    },
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
                    alertSubmit:null,
                    alertSubmitText:undefined,
                    confirmTitle:"",
                    confirmMessage:"",
                    confirmSubmit:null,
                    confirmSubmitText:undefined
                }
            },
            showAlert:function(opt) {
                this.setState({
                    alertMessage:opt.message,
                    alertTitle:opt.title,
                    alertSubmit:opt.submit,
                    alertSubmitText:opt.submitText || undefined
                }, function() {
                    this.refs.alert.show();
                }.bind(this));
            },
            showConfirm:function(opt) {
                this.setState({
                    confirmMessage:opt.message,
                    confirmTitle:opt.title,
                    confirmSubmit:opt.submit,
                    confirmSubmitText:opt.submitText || undefined
                }, function() {
                    this.refs.confirm.show();
                }.bind(this));
            },
            hideAll:function() {
                this.refs.alert.hide();
                this.refs.confirm.hide();
            },
            render:function() {
                return <div>
                    <Dialog ref="alert"
                            title={this.state.alertTitle}
                            buttons={'submit'}
                            onSubmit={this.state.alertSubmit}
                            style={{'min-width':'200px'}}
                            submitText={this.state.alertSubmitText}>
                        {this.state.alertMessage}
                    </Dialog>
                    <Dialog ref="confirm"
                            title={this.state.confirmTitle}
                            buttons={'cancel,submit'}
                            onSubmit={this.state.confirmSubmit}
                            submitText={this.state.confirmSubmitText}>
                        {this.state.confirmMessage}
                    </Dialog>
                </div>
            }
        });

        var instance = ReactDOM.render(<DialogManager />, document.getElementById('dialog-container'));
        this.__instance = instance;
    },
    /**
     * 显示一个alert对话框
     * @param opt {object|string} 显示内容的配置参数
     * @param title {string} 对话框标题
     * @param callback {function} 确认回调函数
     * @example
     * DialogManager.alert("正在跳转中……", "友情提示");
     * DialogManager.alert({
     *      message:"正在跳转中……",
     *      title:"友情提示",
     *      callback:function() {}
     * });
     */
    alert:function(opt, title, callback) {
        if(typeof opt == 'string') {
            opt = {
                message:opt,
                title:title,
                submit:callback
            };
        }

        this.getInstance().showAlert(opt);
    },
    /**
     * 显示一个confirm对话框
     * @param opt {object|string} 显示内容的配置参数
     * @param title {string} 对话框标题
     * @param callback {function} 确认后的回调
     * @example
     * DialogManager.confirm("是否真的要删除？", "友情提示", function() {console.log('submit')});
     * DialogManager.confirm({
     *      message:"是否真的要删除？",
     *      title:"友情提示",
     *      submit:function() {console.log('submit')}
     * });
     */
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
    /**
     * 获取弹出层在界面上mount的ReactElement
     * @inner
     * @returns {DialogContainer}
     */
    getInstance:function() {
        if(!this.__instance) {
            this.createContainer();
        }

        return this.__instance;
    }
};