var path = require('path')
var express = require('express')

require('shelljs/global')
var webpack = require('webpack')
var config = require('../config')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ?
    require('./webpack.prod.conf') :
    require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;

var main = config.dev.main || '';

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))


var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', config.build.assetsRoot)

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }

    var uri = 'http://localhost:' + port + '/' + main;
    console.log('打开:' + uri + '\n');
    //具体参数可以可以在config/index.js- chrome中配置
    opn(uri, { wait: false, app: [config.chrome.name, '--remote-debugging-port=' + config.chrome.debuggingPort, '--disable-web-security', '--user-data-dir=' + config.chrome.userDataPath] });
})