/**
 * 遮罩层工具类
 * @module mixins/OverlayMixin
 * @see {@link module:managers/OverlayManager}
 */

import '../../css/mixin/overlay.scss';

import OverlayManager from '../managers/OverlayManager.jsx';

let overlayId = 0;

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
            OverlayManager.getInstance().show();
            overlayId = this._reactInternalInstance._rootNodeID;
        }else {
            var currentId = this._reactInternalInstance._rootNodeID;
            if(currentId == overlayId)
                OverlayManager.getInstance().hide();
        }
    }
};