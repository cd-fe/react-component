import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';
import constant from '../constant.jsx';

import '../../css/tree.scss';

var TreeNode = React.createClass({
    mixins:[ComponentBase, ToggleMixin],
    getInitialState:function() {
        return {
            expand:this.props.expand || false
        };
    },
    componentDidMount:function() {
        this.toggleAction(this.refs.icon, 'click', constant.expand);
        this.toggleAction(this.refs.label, 'dblclick', constant.expand);
    },
    getDefaultProps:function() {
        return  {
            cname:"treenode"
        };
    },
    render:function() {
        var allname = className(this.props.className, this.getPropClass());
        var currentLevel = (this.props.level>>>0) + 1;

        allname += ' ' + this.getToggleResult();

        if(this.props.dataSource && this.props.dataSource.children && this.props.dataSource.children.length) {
            allname += ' treenode-root';
        }else {
            allname += ' treenode-leaf';
        }

        var icon = this.props.iconRender.call(this, this.props.dataSource);
        var label = this.props.labelRender.call(this, this.props.dataSource);

        return <div className={allname} style={{paddingLeft:currentLevel * constant.treePadding}}>
            <div className={'treenode-show'}>
                {React.cloneElement(icon, {
                    onClick:this.expandHandler,
                    ref:"icon"
                })}
                {React.cloneElement(label, {
                    onDoubleClick:this.expandHandler,
                    ref:"label"
                })}
            </div>
            {this.props.dataSource.children && this.props.dataSource.children.map(function(item, index) {
                return <TreeNode key={index} dataSource={item} source={this.props.dataSource} iconRender={this.props.iconRender} labelRender={this.props.labelRender} />;
            }.bind(this))}
        </div>;
    }
});

var Tree = React.createClass({
    mixins:[ComponentBase],
    getDefaultProps:function() {
        return  {
            cname:"tree",
            iconRender:function(data) {
                var prefix = this.getDefaultClass();
                return <div className={prefix + '-icon'}></div>;
            },
            labelRender:function(data) {
                var prefix = this.getDefaultClass();
                return <label className={prefix + '-text'}>{(data.data || "").toString()}</label>;
            },
            dataSource:[]
        };
    },
    render:function() {
        var allname = className(this.props.className, this.getPropClass());
        return <div className={allname}>
            {this.props.dataSource.map(function(item, index) {
                return <TreeNode key={index} level={1} dataSource={item} source={this.props.dataSource} iconRender={this.props.iconRender} labelRender={this.props.labelRender} />;
            }.bind(this))}
        </div>
    }
});

module.exports = Tree;