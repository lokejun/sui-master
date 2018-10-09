//--========================================================================--
//-- webpack开发调试配置
//-- loke 2018-02-05 15:23:25
//--========================================================================--

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
//var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝文件

var publicPath = '/static/'; //服务器路径
var path = __dirname + '/static/';

var theme = require('./src/theme');

var plugins = [];

plugins.push(new webpack.DefinePlugin({
    ENV_PRODUCE: JSON.stringify(true)
}));
plugins.push(new ExtractTextPlugin('[name].min.css')); //css打包

module.exports = {
    entry: {
        app: './src/App', //编译的入口文件
    },
    output: {
        publicPath: publicPath, //编译好的文件，在服务器的路径
        path: path, //编译到当前目录
        filename: '[name].js', //编译后的文件名字
        chunkFilename: '[name].[chunkhash:6].min.js'
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-runtime&compact=false',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]!autoprefixer-loader' })
            }, {
                test: /\.less/,
                use: ['style-loader','css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]', 'autoprefixer-loader',{loader: 'less-loader', options: {modifyVars: theme}}]
                // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]!autoprefixer-loader!less-loader' })
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|appcache)(\?|$)/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(gif|png|jpg)$/,
                loader: 'url-loader?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }, {
                test: /\.jsx$/,
                loaders: ['jsx-loader', 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-runtime'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx'], //后缀名自动补全
    }
};
