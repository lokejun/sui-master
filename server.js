//--========================================================================--
//-- 本地代理服务器
//-- loke 2018-02-26 09:35:56
//--========================================================================--

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

// 相当于通过本地node服务代理请求到了http://**.**.**.**/api
var proxy = {
    '/api': {
        target: 'http://192.168.1.58:1111',//'http://192.168.1.208:8070',
        pathRewrite: {'^/api': '/web/api'},
        changeOrigin: true
    },
};

//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    disableHostCheck: true,         //开启后其他机器才可以访问到本地
    proxy: proxy,
    stats: {
        colors: true
    },
});

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

server.listen(3000);
