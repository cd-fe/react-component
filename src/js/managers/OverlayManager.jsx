/**
 * 遮罩层管理类
 * @module managers/OverlayManager
 */

module.exports = {
    __overlay:null,
    __autohide:true,
    /**
     * 清除所有遮罩层
     * @static
     * @member
     */
    clearAll:function() {
        if(this.__instance) {
            this.__instance.hide();
        }
    },
    createOverlay:function() {
        var exist = document.getElementById('overlay-container');
        if(!exist) {
            var container = document.createElement('div');
            container.setAttribute('id', 'overlay-container');
            //$(document.body).prepend(container);
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
    /**
     * 显示遮罩层
     */
    show:function() {
        this.getInstance().show();
    },
    /**
     * 关闭遮罩层
     */
    hide:function() {
        this.getInstance().hide();
    },
    getInstance:function() {
        if(!this.__overlay) {
            this.createOverlay();
        }

        return this.__overlay;
    }
};