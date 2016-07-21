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
            file: null
        };
    },
    getInitialState:function() {
        return {
            progress:0
        };
    },
    getInputFile:function() {
        var props = {
            type:'file',
            className:'rui-upload-input',
            onChange:this.fileChangeHandler
        };
        if(this.props.disable) {
            props.disabled = true;
        }
        if(this.props.multiple) {
            props.multiple = true;
        }
        return <input {...props} />;
    },
    fileChangeHandler:function(e) {
        this.props.onChange(e.target.files, this.props.index);
    },
    render:function() {
        return <div className="rui-upload-button">
            {this.props.multiple ? (
                <div className="rui-upload-button-content">
                    {this.props.file && <UploadImage file={this.props.file} />}
                    {(this.props.file && this.props.autoUpload) && <div className="rui-upload-button-progress">

                    </div>}
                    {!this.props.disable && this.getInputFile()}
                </div>
            ) : (
                <RUI.Button onClick={this.clickHandler}>
                    <RUI.Icon name="upload" />
                    点击上传
                    {!this.props.disable && this.getInputFile()}
                </RUI.Button>
            )}
        </div>;
    }
});

var UploadImage = React.createClass({
    getDefaultProps:function() {
        return {
            file:null
        };
    },
    getInitialState:function() {
        return {
            imageData:null,
            file:this.props.file
        };
    },
    componentDidMount:function() {
        var _this = this;
        this.preview();
    },
    componentWillReceiveProps:function(nextProps) {
        if(nextProps.file !== this.props.file) {
            this.setState({
                file:nextProps.file
            }, function() {
                this.preview();
            }.bind(this));
        }
    },
    preview:function() {
        var _this = this;
        if(this.state.file && this.state.file.name) {
            var reader = new FileReader();
            reader.onload = function() {
                _this.setState({
                    imageData:this.result
                });
            };
            reader.readAsDataURL(this.state.file);
        }
    },
    imageLoadComplete:function() {
        var img = ReactDOM.findDOMNode(this);
        var imageSize = {
            width:img.width,
            height:img.height
        };
        var parentSize = {
            width:img.parentNode.clientWidth,
            height:img.parentNode.clientHeight
        };

        //img.style.top = Math.max(0, )
        if((imageSize.width / imageSize.height) > (parentSize.width / parentSize.height)) {
            img.style.height = '100%';
            img.style.width = 'auto';
            img.style.top = 0;
            img.style.left = ((parentSize.width - imageSize.width / (imageSize.height / parentSize.height)) / 2) + 'px';
        }else {
            img.style.height = 'auto';
            img.style.width = '100%';
            img.style.left = 0;
            img.style.top = ((parentSize.height - imageSize.height / (imageSize.width / parentSize.width)) / 2) + 'px';
        }
    },
    render:function() {
        return <img className="upload-preview" onLoad={this.imageLoadComplete} src={this.state.imageData}/>;
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
            useDragDrop: true,
            showProgress: true,
            multiple: false,
            name: 'image',
            action: '#',
            headers: {},
            onStart: null,
            onError: null,
            onProgress: null,
            beforeUpload: null,
            autoUpload:false
        };
    },
    getInitialState:function() {
        return {
            list:[]
        };
    },
    fileChangeHandler:function(files, index) {
        if(this.props.multiple) {
            var list = this.state.list;
            files = Array.apply(null, files);
            list.splice.apply(list, Array.prototype.concat.apply([index, files.length], files));
            this.setState({
                list:list
            });
        }else {
            this.setState({
                list:files
            });
        }
    },
    clearList:function(e) {
        if(this.props.multiple) {

        }else {
            this.setState({
                list:[]
            });
        }
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        var props = require('../util/omit.jsx')(this.props, 'onClick');
        return <div {...props} className={classes + " clearfix"}>
            {this.props.multiple ?
                <div className="rui-upload-list">
                    {this.state.list.concat(null).map(function(file, index) {
                        return <UploadButton {...props} onChange={this.fileChangeHandler} file={file} key={index} index={index}/>;
                    }.bind(this))}
                </div> :
                <div>
                    <UploadButton {...props} onChange={this.fileChangeHandler}/>
                    {!!this.state.list.length &&
                        <div className="rui-upload-info">
                            <RUI.Icon name="attach" style={{marginLeft:'10px'}} />
                            <div style={{width:'152px',float:'left'}}>
                                <RUI.Link style={{width:'142px'}}>
                                    {this.state.list[0].name}
                                </RUI.Link>
                                <RUI.Tooltip align="top-center">{this.state.list[0].name}</RUI.Tooltip>
                            </div>
                            <RUI.Link className="rui-upload-info-clear" onClick={this.clearList} style={{margin:'0 10px'}}><RUI.Icon name="close" /></RUI.Link>
                        </div>
                    }
                </div>
            }
            {this.props.children}
        </div>;
    }
});