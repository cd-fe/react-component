var path = require('path');
var project = require('./package.json');
var node_modules = path.resolve(__dirname, 'node_modules');
var react = path.resolve(node_modules, 'react/dict/react.js');
var autoprefixer = require("autoprefixer");
var process = require('process');

var ENV = process.env.NODE_ENV;
var config = {
    entry:{
        'example':'./example/example.jsx'
    },
    output:{
        //publicPath:"./dist/",
        publicPath:ENV == 'development' ? "http://localhost:8008/example/dist/" : "./dist/",
        path:"./example/dist/",
        filename:'example.js',
        chunkFilename:'chunk/[name].[chunkhash:8].js'
    },
    externals: [
        {
            "jquery": "jQuery",
            "react": "React",
            "react-dom": "ReactDOM",
            "zepto": "Zepto"
        },
        require('webpack-require-http')
    ],
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
                loader:'style!css!postcss!sass'
            },
            {
                test:/\.css?$/,
                //注意，因为例如ImageEditor.jsx/Slider.jsx代码中引用了node_modules下的css，所以此处不能排除掉node_modules目录
                loader:'style!css'
            },
            {
                test: /\.md$/,
                loader: "html!markdown"
            },
            {
                test:/\.(jpg|png|gif|jpeg)?$/,
                loader:'url'
            }
        ],
        noParse:[react]
    },
    postcss: [ autoprefixer({ browsers: ['> 0.1%'] }) ],
    resolve:{
        alias:{
            "react-component-lib":ENV == 'development' ? "../src/js/rui.jsx" : '../dist/bundle.js'
        }
    }
};

module.exports = config;