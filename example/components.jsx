import {Link} from 'react-router';

module.exports = React.createClass({
    render:function() {
        return <div className="components">
            <ul className="lists">
                <li><Link activeClassName="active" to="/components/button">按钮</Link></li>
                <li><Link activeClassName="active" to="/components/input">输入框</Link></li>
                <li><Link activeClassName="active" to="/components/pagination">分页</Link></li>
                <li><Link activeClassName="active" to="/components/dialog">弹出层</Link></li>
                <li><Link activeClassName="active" to="/components/tooltip">提示</Link></li>
                <li><Link activeClassName="active" to="/components/checkbox">多选</Link></li>
                <li><Link activeClassName="active" to="/components/radio">单选</Link></li>
                <li><Link activeClassName="active" to="/components/table">表格</Link></li>
                <li><Link activeClassName="active" to="/components/datepicker">日历</Link></li>
                <li><Link activeClassName="active" to="/components/loading">加载</Link></li>
            </ul>
            <div className="component-detail">
                {this.props.children}
            </div>
        </div>
    }
});