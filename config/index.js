'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path') //nodejs 文件路径插件
module.exports = {
  dev: { //dev环境

    // Paths
    assetsSubDirectory: 'static',//除了
    assetsPublicPath: '/',
    proxyTable: { //设置请求的代理地址  解决跨域请求
      '/api':{
        target:'http://api.douban.com',
        // secure:false, //默认不接受https，加上表示可以代理https请求
        changeOrigin:true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/dl':{
        target:'https://baike.baidu.com',
        secure:true,
        changeOrigin:true,
        pathRewrite: {
          '^/dl': ''
        }
      },
      '/m':{
        target:'https://kfmobi.huigoufang.com/api',
        secure:true,
        changeOrigin:true,
        pathRewrite: {
          '^/m': ''
        }
      }
    },//解决跨域

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST //
    port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,//是否立即启用（使用默认浏览器）
    errorOverlay: true,//浏览器提示错误
    notifyOnErrors: true,//跨平台提示错误
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    //使用文件系统(file system)获取文件改动的通知devServer.watchOptions
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,//是否使用eslint
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,//错误和警告显示在控制台

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map', //选择一种source map格式来增强调试过程。 原始源代码（仅限行）构建速度中等重建速度比较慢

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,////使缓存失效
    cssSourceMap: true//是否开启 cssSourceMap
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    //path.resolve 方法将路径或路径片段的序列解析为绝对路径
    //__dirname 当前模块的目录名
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),//webpack所有处理过的文件都在这个目录下.
    assetsSubDirectory: 'static',//webpack编译过后的资源文件都会放在static的目录下,每次编译前static文件会被清空。
    assetsPublicPath: '../dist/',//通过http服务器运行的url路径，大多数情况下是根目录(/),后台有要求加上./或者根据目录添加。（*在内部，这个是被webpack当做output.publicPath来处理的）。
    /**
     * Source Maps
     */
    productionSourceMap: true,//在构建生产环境版本时是否开启source map。
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',//方便检查bug,

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,//是否开启压缩
    productionGzipExtensions: ['js', 'css'],//压缩文件类型

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report //打包文件优化工具
  }
}
// module.exports = {
//   externals: {
//     'element-ui': 'ELEMENT',
//     Vue:'Vue',
//     'vue-router':'VueRouter'
//   }
// }
