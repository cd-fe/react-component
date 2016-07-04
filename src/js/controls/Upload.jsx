/**
 * 按钮组件
 * @module controls/Button
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Icon from './Icon.jsx';

import '../../css/upload.scss';

var UploadButton = React.createClass({
    getDefaultProps:function() {
        return {
            disable:false,
            multiple: false,
            name: 'image',
            action: '#',
            headers: {},
            onStart: null,
            onError: null,
            beforeUpload: null,
            listStype: 'normal'
        };
    },
    render:function() {
        return <div className="rui-upload-button">
            {this.props.listStype == 'card' ? (
                <div />
            ) : (
                <RUI.Button onClick={this.clickHandler}>
                    <RUI.Icon name="upload" />
                    点击上传
                </RUI.Button>
            )}

            <input type="file" className="rui-upload-input" />
        </div>;
    }
});

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default button
             * @type string
             * @desc 组件名称
             */
            cname: 'upload',
            /**
             * @instance
             * @default false
             * @type boolean
             * @desc 设置按钮是否禁用
             */
            disable: false,
            listLayout: 'normal',    // normal flud card
            useDragDrop: true,
            showProgress: true,
            multiple: false,
            name: 'image',
            action: '#',
            headers: {},
            onStart: null,
            onError: null,
            onProgress: null,
            beforeUpload: null
        };
    },
    clickHandler:function() {

    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        var props = require('../util/omit.jsx')(this.props, 'onClick');
        return <div {...props} className={classes}>
            <div className="rui-upload-list">
                <UploadButton {...props} />
            </div>
            {this.props.children}
        </div>;
    }
});