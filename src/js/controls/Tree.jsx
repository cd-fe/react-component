import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import constant from '../constant.jsx';

import '../../css/tree.scss';

var TreeNode = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            expand:this.props.expand || false
        };
    },
    getDefaultProps:function() {
        return  {
            cname:"treenode"
        };
    },
    render:function() {
        var allname = className(this.props.className, this.getPropClass());
        var currentLevel = (this.props.level>>>0) + 1;

        if(this.state.expand) {
            allname += ' expand';
        }
        if(this.props.dataSource && this.props.dataSource.children && this.props.dataSource.children.length) {
            allname += ' treenode-root';
        }else {
            allname += ' treenode-leaf';
        }

        return <div className={allname} style={{paddingLeft:currentLevel * constant.treePadding}}>
            {this.props.labelRender.call(null, this.props.dataSource)}
            {this.props.dataSource.children && this.props.dataSource.children.map(function(item, index) {
                return <TreeNode key={index} dataSource={item} source={this.props.dataSource} labelRender={this.props.labelRender} />;
            }.bind(this))}
        </div>;
    }
});

var Tree = React.createClass({
    mixins:[ComponentBase],
    labelRender:function(data) {
        var prefix = this.getDefaultClass();
        return <div>
            <label className={prefix + '-text'}>{(data.data || "").toString()}</label>
        </div>;
    },
    getDefaultProps:function() {
        return  {
            cname:"tree",
            labelRender:null,
            dataSource:[]
        };
    },
    render:function() {
        var allname = className(this.props.className, this.getPropClass());

        var labelRender = this.props.labelRender || this.labelRender;
        return <div className={allname}>
            {this.props.dataSource.map(function(item, index) {
                return <TreeNode key={index} level={1} dataSource={item} source={this.props.dataSource} labelRender={labelRender} />;
            }.bind(this))}
        </div>
    }
});

module.exports = Tree;