/**
 * 树形菜单组件
 * @module controls/Tree
 */

import className from '../util/className.jsx';
import omit from '../util/omit.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';
import constant from '../constant.jsx';
import DataSource from '../data/DataSource.jsx';

import '../../css/tree.scss';

var TreeNode = React.createClass({
    mixins: [ComponentBase, ToggleMixin],
    getInitialState: function () {
        return {
            expand: this.props.expand || false
        };
    },
    componentDidMount: function () {
        if (this.props.dataSource && this.props.dataSource.children && this.props.dataSource.children.length) {
            this.toggleAction(this.refs.icon, 'click', constant.expand);
            this.toggleAction(this.refs.label, 'dblclick', constant.expand);

            this.addEventListener('change', this.changeHandler);
        }
    },
    clickHandler: function (event) {
        if (this.props.dataSource && (!this.props.dataSource.children || !this.props.dataSource.children.length)) {
            this.dispatchEvent('select', {
                target: this,
                dataSource: this.props.dataSource,
                source: this.props.source
            });
        }
    },
    changeHandler: function (event) {
        this.dispatchEvent('expand', {
            target: this,
            dataSource: this.props.dataSource,
            source: this.props.source,
            expand: event.data.selected
        });
    },
    getDefaultProps: function () {
        return {
            cname: "treenode"
        };
    },
    render: function () {
        var allname = className(this.props.className, this.getPropClass());
        var currentLevel = (this.props.level >> 0) + 1;

        allname += ' ' + this.getToggleResult();

        if (this.props.dataSource && this.props.dataSource.children && this.props.dataSource.children.length) {
            allname += ' treenode-root';
        } else {
            allname += ' treenode-leaf';
        }

        var icon = this.props.iconRender.call(this, this.props.dataSource);
        var label = this.props.labelRender.call(this, this.props.dataSource);

        var props = omit(this.props, 'cname', 'level');

        return <div className={allname}>
            <div className={'treenode-show'} onClick={this.clickHandler}
                 style={{paddingLeft:currentLevel * constant.treePadding}}>
                {React.cloneElement(icon, {
                    ref: "icon"
                })}
                {React.cloneElement(label, {
                    ref: "label"
                })}
            </div>
            {this.props.dataSource.children && this.props.dataSource.children.map(function (item, index) {
                return <TreeNode {...props} key={index} level={currentLevel} dataSource={item}
                                            source={this.props.dataSource}/>;
            }.bind(this))}
        </div>;
    }
});

var Tree = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default tree
             * @type string
             * @desc 组件名称
             */
            cname: "tree",
            /**
             * @member
             * @instance
             * @param data
             * @returns {ReactElement}
             * @default function
             * @type function
             * @desc 单个节点的图标区域渲染
             */
            iconRender: function (data) {
                var prefix = this.getDefaultClass();
                return <div className={prefix + '-icon'}></div>;
            },
            /**
             * @member
             * @instance
             * @param data
             * @returns {ReactElement}
             * @default function
             * @type function
             * @desc 单个节点的内容区域渲染
             */
            labelRender: function (data) {
                var prefix = this.getDefaultClass();
                return <label
                    className={prefix + '-text'}>{(this.props.labelFunction(data.data) || "").toString()}</label>;
            },
            /**
             * @member
             * @instance
             * @param data
             * @returns {string}
             * @default function
             * @type function
             * @desc 对内容区域进行文本修正显示
             */
            labelFunction: function (data) {
                return data.toString();
            },
            /**
             * @instance
             * @default []
             * @type array
             * @desc 节点数据
             * @example
             * dataSource = {
             *   data:"Post",
             *   children:[
             *       {data:"All Post", children:[{data:"All"}, {data:"Published"}, {data:"Draft"}]},
             *       {data:"Add New"},
             *       {data:"Categories", children:[{data:"List"}, {data:"Add New"}]},
             *       {data:"Tags", children:[{data:"List"}, {data:"Add New"}]}
             *   ]
             * },
             * {
             *    data:"Media",
             *    children:[
             *        {data:"Library"},
             *        {data:"Add New"}
             *    ]
             * }
             */
            dataSource: []
        };
    },
    render: function () {
        var allname = className(this.props.className, this.getPropClass());

        var props = omit(this.props, 'cname');
        return <div className={allname}>
            {this.props.dataSource.map(function (item, index) {
                return <TreeNode {...props} key={index} level={-1} dataSource={item} source={this.props.dataSource}/>;
            }.bind(this))}
        </div>
    }
});

module.exports = Tree;