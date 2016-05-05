import {Link} from 'react-router';

module.exports = React.createClass({
    render:function() {
        return <ul className="menu">
            <li><Link to="/components/button">组件列表</Link></li>
            <li><Link to="/components/button">入门指南</Link></li>
            <li><a href="http://5doe.com/custom/react-component-api/index.html">API Doc</a></li>
            <li><a href="http://github.com/cd-fe/react-component">Github</a></li>
        </ul>;
    }
});