import Menu from './menu.jsx';

import './example.scss';

module.exports = React.createClass({
    render:function() {
        return (
            <div className="wrapper">
                <div className="topbar">
                    <div className="row">
                        <span className="logo">React Component</span>
                        <Menu route={this.props.route}/>
                    </div>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});