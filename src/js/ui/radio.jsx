import React from 'react';
import ReactDOM from 'react-dom';
import '../../theme/radio.scss';

export default class Radio extends React.Component {

    static propTypes = {
        onClick:React.PropTypes.func,
        disabled:React.PropTypes.bool,
        children:React.PropTypes.any,
        style:React.PropTypes.object,
        loading:React.PropTypes.bool
    };

    static defaultProps = {
        onClick:null,
        disabled:false,
        children:[],
        style:{},
        loading:false
    };

    constructor(props) {
        super(props);

        this.state = {
            disabled:this.props.disabled,
            loading:this.props.loading
        };
    }

    disable() {
        this.setState({
            disabled:true
        });
    }

    enable() {
        this.setState({
            disabled:false
        });
    }

    componentWillReceiveProps(newValueProps) {
        if(newValueProps.disabled != this.state.disabled || newValueProps.loading != this.state.loading) {
            this.setState({
                disabled:newValueProps.disabled,
                loading:newValueProps.loading
            });
        }
    }

    render() {
        return (
            <button className={"rui-button "+(this.state.disabled && 'disabled')} onClick={!this.state.disabled && this.props.onClick}
                    disabled={this.state.disabled}
                    style={this.props.style}
                    disabled={this.state.disabled} >
                {(this.props.children instanceof Array) ? (this.state.loading ? this.props.children[1] : this.props.children[0]) : this.props.children}
            </button>
        );
    }
}