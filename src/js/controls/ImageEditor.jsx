/**
 * 图片编辑
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
             * @desc 待编辑的图片数据，可以是File对象，也可以是image base64字符串
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
                }, ()=>{
                    ReactDOM.findDOMNode(this.refs.image).style.opacity = 0;
                });
            }
            else if (window.File && this.state.data instanceof window.File) {
                var _this = this;
                var reader = new FileReader();
                reader.onload = function () {
                    _this.setState({
                        image: this.result
                    }, ()=>{
                        ReactDOM.findDOMNode(_this.refs.image).style.opacity = 0;
                    });
                };
                reader.readAsDataURL(this.state.data);
            }
        }
    },
    clearCropper: function () {
        this.cropper && this.cropper.destroy();
        this.cropper = null;

        var image = ReactDOM.findDOMNode(this.refs.image);
        image && (image.style.opacity = 0);
    },
    /**
     * 获取CropperJS创建的实例
     * @instance
     * @desc 图片裁剪使用第三方CropperJS完成，此处可完全获取CropperJS实例，开发者可根据CropperJS文档完全自主操作
     * @return {null|*}
     */
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