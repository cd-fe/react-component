import {Link} from 'react-router';

var mixedMode = {
    name: "htmlmixed",
    scriptTypes: [
        {matches: /\/x-handlebars-template|\/x-mustache/i, mode: null},
        {matches: /(text|application)\/(x-)?vb(a|script)/i, mode: "vbscript"}
    ]
};

module.exports = React.createClass({
    componentDidUpdate:function() {
        this.rebuildCodeMirror();
    },
    componentDidMount:function() {
        this.rebuildCodeMirror();
    },
    editor:null,
    rebuildCodeMirror:function() {
        if(typeof CodeMirror == 'undefined' || CodeMirror.mimeModes['text/html'] != 'htmlmixed' || !$('.source>textarea').text()) {
            setTimeout(this.rebuildCodeMirror, 100);
        }else {
            if(!this.editor || this.editor.getValue() != $('.source>textarea').text()) {
                this.editor = CodeMirror.fromTextArea($('.source>textarea')[0], {
                    mode: mixedMode,
                    selectionPointer: true,
                    readOnly: true,
                    lineWrapping: true
                });
            }
            this.editor.setValue($('.source>textarea').text());
            this.editor.setSize('auto', 'auto');
        }
    },
    render:function() {
        return <div className="components">
            <ul className="lists">
                <li><Link activeClassName="active" to="/components/form">表单</Link></li>
                <li><Link activeClassName="active" to="/components/button">按钮</Link></li>
                <li><Link activeClassName="active" to="/components/input">输入框</Link></li>
                <li><Link activeClassName="active" to="/components/spinner">数字调节器</Link></li>
                <li><Link activeClassName="active" to="/components/select">下拉选框</Link></li>
                <li><Link activeClassName="active" to="/components/pagination">分页</Link></li>
                <li><Link activeClassName="active" to="/components/dialog">弹出层</Link></li>
                <li><Link activeClassName="active" to="/components/tooltip">提示</Link></li>
                <li><Link activeClassName="active" to="/components/checkbox">多选</Link></li>
                <li><Link activeClassName="active" to="/components/radio">单选</Link></li>
                <li><Link activeClassName="active" to="/components/table">表格</Link></li>
                <li><Link activeClassName="active" to="/components/datepicker">日历</Link></li>
                <li><Link activeClassName="active" to="/components/loading">加载</Link></li>
                <li><Link activeClassName="active" to="/components/tree">树形菜单</Link></li>
                <li><Link activeClassName="active" to="/components/slider">轮播图</Link></li>
                <li><Link activeClassName="active" to="/components/scrollview">滚动视图</Link></li>
            </ul>
            <div className="component-detail">
                {this.props.children}
            </div>
        </div>
    }
});