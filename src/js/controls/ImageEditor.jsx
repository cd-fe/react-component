/**
 * 图片编辑器
 * @module controls/ImageEditor
 */
import className from '../util/className.jsx';
import OverlayMixin from '../mixins/OverlayMixin.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Cropper from 'cropperjs';
import '../../css/imageeditor.scss';
import 'cropperjs/dist/cropper.css';

var ImageEditor = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getInitialState: function () {
        return {
            image: null,
            data: this.props.data
        };
    },
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default dialog
             * @type string
             * @desc 组件名称
             */
            cname: "imageeditor",
            /**
             * @instance
             * @default null
             * @type string|object
             * @desc 待编辑图片，此处可为图片远程链接，本地路径，以及base64
             */
            data: null
        };
    },
    componentDidMount: function () {
        this.setState({
            data: this.props.data
        }, ()=> {
            this.formatData();
        });
    },
    componentDidUpdate: function () {
        this.getCropper();
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.data !== this.state.data) {
            this.setState({
                data: nextProps.data
            }, ()=> {
                this.clearCropper();
                this.formatData();
            })
        }
    },
    formatData: function () {
        if (this.state.data) {
            if (typeof this.state.data == 'string') {
                this.setState({
                    image: this.state.data
                });
            }
            else if (window.File && this.state.data instanceof window.File) {
                var _this = this;
                var reader = new FileReader();
                reader.onload = function () {
                    _this.setState({
                        image: this.result
                    });
                };
                reader.readAsDataURL(this.state.data);
            }
        }
    },
    clearCropper: function () {
        this.cropper && this.cropper.destroy();
        this.cropper = null;
    },
    getCropper: function () {
        if (!this.cropper && this.refs.image) {
            this.cropper = new Cropper(ReactDOM.findDOMNode(this.refs.image), this.props);
        }
        return this.cropper;
    },
    render: function () {
        var classes = className(this.props.className, this.getPropClass());
        return <div className={classes}>
            {this.state.image && <img ref="image" className="rui-imageeditor-content" src={this.state.image}/>}
        </div>;
    }
});

module.exports = ImageEditor;