var path = require('path');
var project = require('./package.json');
var node_modules = path.resolve(__dirname, 'node_modules');
var react = path.resolve(node_modules, 'react/dict/react.js');
var autoprefixer = require("autoprefixer");
var mousewheel = path.resolve(node_modules, 'jquery-mousewheel/jquery.mousewheel.js');

module.exports = {
    entry:{
        'bundle':'./src/js/rui.jsx'
    },
    output:{
        path:"./",
        library: 'react-component-lib',
        libraryTarget: 'umd',
        filename:'dist/bundle.js'
    },
    externals: {
        "jquery": "jQuery",
        "react": "React",
        "react-dom": "ReactDOM",
        "zepto": "Zepto",
        "react-draggable-browser":"react-draggable-browser",
        "swiper":"swiper",
        "cropperjs":"cropperjs",
        "jquery-mousewheel":"jquery-mousewheel"
    },
    module:{
        loaders:[
            {
                test:/\.(jsx)?$/,
                exclude:/(node_modules)/,
                loader: 'babel',
                query:{
                    presets:['es2015', 'stage-0', 'react']
                }
            },
            {
                test:/\.(scss|sass)?$/,
                exclude:/(node_modules)/,
                loader:'style?singleton!css!postcss!sass'
            },
            {
                test:/\.css?$/,
                //注意，因为例如ImageEditor.jsx/Slider.jsx代码中引用了node_modules下的css，所以此处不能排除掉node_modules目录
                loader:'style?singleton!css'
            },
            {
                test:/\.(jpg|png|gif|jpeg)?$/,
                loader:'url'
            }
        ],
        noParse:[react, mousewheel]
    },
    postcss: [ autoprefixer({ browsers: ['> 0.1%'] }) ],
};