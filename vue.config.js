let proxyObj = {};
proxyObj['/'] = {
    ws: false,//如果要代理 websockets，配置这个参数
    target: 'http://localhost:8081',//后台接口域名
    changeOrigin: true,//是否跨域
    pathRewrite: {
        '^/': ''
    }
}


module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}