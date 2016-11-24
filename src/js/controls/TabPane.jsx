/**
 * Created by CoolGuy on 2016/11/23 11:27.
 * Tab的子项
 */

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default tab-pane
             * @type string
             * @desc 组件名称
             */
            cname: 'tab-pane'
        };
    },
    render(){
        return (
            <div>{this.props.children}</div>
        )
    }
});
