var path = require('path');
var project = require('./package.json');
var node_modules = path.resolve(__dirname, 'node_modules');
var react = path.resolve(node_modules, 'react/dict/react.js');
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
        "react-draggable-browser":true
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
                loader:'style/url!css!sass'
            },
            {
                test:/\.css?$/,
                loader:'style/url!css'
            },
            {
                test:/\.(jpg|png|gif|jpeg)?$/,
                loader:'url'
            }
        ],
        noParse:[react, mousewheel]
    }
};