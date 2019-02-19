'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge') //webpack 合并配置合并功能，后面的配置会覆盖前面的配置
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')//用于copy文件和文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin')//用于生成html文件的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')//美化webpack的错误信息和日志的插件
const portfinder = require('portfinder')//查看空闲端口位置，默认情况下搜索8000端口

const HOST = process.env.HOST //process为node全局对象获取当前程序的环境变量(Host)。
const PORT = process.env.PORT && Number(process.env.PORT)
//开发环境完整的配置文件
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // utils中处理出来的styleLoaders，为那些独立的css类型文件添加loader配置（没有写在vue文件的style标签中的样式）
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,//cheap-module-eval-source-map在开发板比较快

  // these devServer options should be customized in /config/index.js
   //此处的配置都是在config的index.js中设定好了，也可以自定义配置
  devServer: {
    clientLogLevel: 'warning',//在开发工具控制台(console)消息值有none, error, warning 或者 info（默认值）
    historyApiFallback: {//使用HTML5 History API时，任意404响应都会被替代为index.html https://webpack.docschina.org/configuration/dev-server/#devserver-historyapifallback
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,//启用 webpack 的模块热替换特性
    contentBase: false, // since we use CopyWebpackPlugin.//（false禁用）告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要，默认情况下，将使用当前工作目录作为提供内容的目录
    compress: true,//一切服务都启用gzip压缩
    host: HOST || config.dev.host,//指定一个host默认是localhost
    port: PORT || config.dev.port,//指定监听请求的端口号
    open: config.dev.autoOpenBrowser,//启用后会打开浏览器，如果没有提供浏览器使用默认浏览器，指定不同浏览器可以:webpack-dev-server --open 'Goole Chrome'
    overlay: config.dev.errorOverlay //编译器错误或警告时在浏览器会全屏覆盖，默认是禁用，如果想显示错误和警告overlay:{ warnings: false, errors: true };
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,//指定webpack-dev-server的根目录，目录下面的文件可以通过浏览器直接访问。devServer.publicPath 和 output.publicPath 一样被推荐。 
    proxy: config.dev.proxyTable,//设置请求代理解决跨域 https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
    quiet: true, // necessary for FriendlyErrorsPlugin启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见
    watchOptions: {//监视文件相关的控制选项
      poll: config.dev.poll,//如果选项为true会以轮询的方式检查我们的文件的变动。效率不好
    }
  },
  //插件列表
  plugins: [
    //DefinePlugin 允许创建一个在编译时可以配置的全局常量
    //在生产/开发构建中使用不用的服务的URL
    // https://webpack.docschina.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(), //启用热替换模块
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.在热加载时候返回更新的文件的名称。
    new webpack.NoEmitOnErrorsPlugin(),//这个插件可以在编译出错的时候跳过输出阶段，这样可以确保输出资源不会包含错误
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ //生成一个html5的文件
      filename: 'index.html', //生成HTML文件的名称
      template: 'index.html',//使用的模本的名称
      inject: true//当传递true或'body'时，所有javascript资源将被放置在body元素的底部
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),//定义要拷贝的原目录
        to: config.dev.assetsSubDirectory,//定义要拷贝到的目标目录
        ignore: ['.*']//忽略拷贝指定的文件
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port  //把获取的端口号设置为port的值
      // add port to devServer config
      devWebpackConfig.devServer.port = port //重新设置webpack-dev-server端口的值

      // Add FriendlyErrorsPlugin
      // 将FriendlyErrorsPlugin添加到webpack的配置文件中
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        //编译成功时候的输出信息
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        // 当编译出错的时候，根据config.dev.notifyOnErrors来确定是否需要在桌面右上角显示错误通知框
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)//返回配置文件
    }
  })
})
