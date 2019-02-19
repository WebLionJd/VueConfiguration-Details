'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
//生成根目录的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
//创建eslint规则
const createLintingRule = () => ({
  test: /\.(js|vue)$/, //对.js和.vue结尾的文件进行eslint检查
  loader: 'eslint-loader',//使用eslint-loader
  enforce: 'pre',//  // enforce的值可能是pre和post。其中pre有点和webpack@1中的preLoader配置含义相似。
  // post和v1中的postLoader配置含义相似。表示loader的调用时机
  // 这里表示在调用其他loader之前需要先调用这个规则进行代码风格的检查
  include: [resolve('src'), resolve('test')],//需要进行eslint检查的文件的目录存在的地方
  options: {
    formatter: require('eslint-friendly-formatter'),//// 文件风格的检查的格式化程序，这里使用的是第三方的eslint-friendly-formatter
    emitWarning: !config.dev.showEslintErrorsInOverlay//// 是否需要eslint输出警告信息
  }
})
//webpack公共基本配置信息
module.exports = {
  context: path.resolve(__dirname, '../'),//webpack解析文件的根目录
  entry: {
    app: './src/main.js' //项目的入口文件
  },
  //项目的输出配置
  output: {
    path: config.build.assetsRoot,//项目build时候生成的文件的存放路径
    filename: '[name].js',//生成文件的名称
    publicPath: process.env.NODE_ENV === 'production' //输出解析文件的目录，url 相对于 HTML 页面(生成的html文件中，css和js等静态文件的url前缀)
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //配置模块解析时候的选项
  resolve: {
    extensions: ['.js', '.vue', '.json'],//自动扩展后缀，在引用的时候可以省略后缀名(import test from '@/views/test')
    alias: {
      'vue$': 'vue/dist/vue.esm.js',//末尾添加 $，以表示精准匹配：(https://webpack.docschina.org/configuration/resolve/#resolve-alias)
      '@': resolve('src'), // 可以在引入文件的时候使用@符号引入src文件夹中的文件
    }
  },
  module: {
    rules: [//每个对象对应针对具体类型的文件进行配置
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,//正则验证 匹配.vue的文件
        loader: 'vue-loader', //加载器名称
        options: vueLoaderConfig //vue一些配置css类型文件的配置，css source map的配置等。
      },
      {
        test: /\.js$/,//匹配js文件
        loader: 'babel-loader',//使用babel-loader编译js文件
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,// 文件的大小小于10000字节(10kb)的时候会返回一个dataUrl
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 生成的文件的保存路径和后缀名称
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    //以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中 
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
