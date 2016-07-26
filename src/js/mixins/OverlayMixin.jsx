/**
 * 遮罩层工具类
 * @module mixins/OverlayMixin
 * @see {@link module:managers/OverlayManager}
 */

import '../../css/mixin/overlay.scss';

import OverlayManager from '../managers/OverlayManager.jsx';

let overlayId = [];

module.exports = {
    getInitialState:function() {
        return {
            /**
             * 根据属性里的overlay属性设置当前遮罩层是否显示
             * @instance
             * @type boolean
             */
            overlay:this.props.overlay || true
        }
    },
    componentWillReceiveProps:function(props) {
        if(typeof props.overlay != 'undefined') {
            this.setState({
                overlay: props.overlay || true
            });
        }
    },
    componentDidMount:function() {
        this.updateOverlay();
    },
    componentDidUpdate:function() {
        this.updateOverlay();
    },
    updateOverlay:function() {
        if(this.state.overlay && this.state.show) {
            var currentId = this._reactInternalInstance._rootNodeID;
            if(overlayId.indexOf(currentId) < 0) {
                overlayId.push(currentId);
                OverlayManager.getInstance().show();
            }
        }else {
            var currentId = this._reactInternalInstance._rootNodeID;
            if(overlayId.indexOf(currentId) >= 0) {
                OverlayManager.getInstance().hide();

                var index = overlayId.indexOf(currentId);
                overlayId.splice(index, 1);
            }
        }
    }
};