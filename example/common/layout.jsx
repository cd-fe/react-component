import Menu from './menu.jsx';
import {Link} from 'react-router';

import './example.scss';

var home = require("../../README.md");

module.exports = React.createClass({
    render:function() {
        return (
            <div className="wrapper">
                <div className="topbar">
                    <div className="row">
                        <Link to="/" style={{color:"#fff"}}><span className="logo">React Component</span></Link>
                        <Menu route={this.props.route}/>
                    </div>
                </div>
                <div ref={"content"} className="content">
                    {this.props.children || (
                        <div className="home">
                            <h3>什么是RUI</h3>
                            <p>RUI是一款全新的React基础组件库，可在多端独立使用，基础组件采用基于行为的方法进行搭建混合，非常方便后期扩展自定义组件，RUI在添加shim/sham（推荐使用<a href="https://github.com/darkty2009/baseline/">baseline.js</a>代替）的情况下，已测试通过包括IE8在内的浏览器。</p>
                            <div className="home-list">
                                <Link to="/components/button">组件列表</Link>
                                <Link to="/article">入门指南</Link>
                                <Link to="/docs">API文档</Link>
                                <a href="https://github.com/cd-fe/react-component">贡献代码</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
});