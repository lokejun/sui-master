//--========================================================================--
//-- webpack打包发布配置
//-- loke 2018-02-05 15:23:25
//--========================================================================--

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝文件

var publicPath = '/static/'; //服务器路径
var path = __dirname + '/static/';
var theme = require('./src/theme');

var plugins = [];

if (process.argv.indexOf('-p') > -1) { //生产环境
    plugins.push(new webpack.DefinePlugin({ //编译成生产版本
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        },
        ENV_PRODUCE: JSON.stringify(false)
    }));
    publicPath = 'static/';
    path = __dirname + '/dist/static/';
}
plugins.push(new ExtractTextPlugin('[name].min.css')); //css打包

plugins.push(new CopyWebpackPlugin([{
    from:'./public',
    to: __dirname + '/dist/public',
    toType:'dir'
}]));

plugins.push(new HtmlWebpackPlugin({                   //根据模板插入css/js等生成最终HTML
    filename: '../index.html',                          //生成的html存放路径，相对于 path
    template: './template.html',                       //html模板路径
    hash: true,                                     //为静态资源生成hash值
}));

module.exports = {
    entry: {
        app: './src/App',                               //编译的入口文件
    },
    output: {
        publicPath: publicPath,                         //编译好的文件，在服务器的路径
        path: path,                                     //编译到当前目录
        filename: '[name].js',                          //编译后的文件名字
        chunkFilename: '[name].[chunkhash:6].min.js'
    },
    devtool: false,
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
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]', 'autoprefixer-loader',{loader: 'less-loader', options: {modifyVars: theme}}]})
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                loader: 'file-loader?name=[name].[ext]&publicPath=../' + publicPath
            }, {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader?limit=20000&name=[name].[ext]&publicPath=../' + publicPath //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
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
