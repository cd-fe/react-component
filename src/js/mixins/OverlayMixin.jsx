import '../../css/mixin/overlay.scss';

import OverlayManager from '../managers/OverlayManager.jsx';

module.exports = {
    getInitialState:function() {
        return {
            overlay:this.props.overlay || true
        }
    },
    componentWillReceiveProps:function(props) {
        this.setState({
            overlay:props.overlay || true
        });
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
        }else {
            OverlayManager.getInstance().hide();
        }
    }
};