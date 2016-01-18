import '../../css/mixin/overlay.scss';

import OverlayManager from '../managers/OverlayManager.jsx';

let overlayId = 0;

module.exports = {
    getInitialState:function() {
        return {
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