'use strict'
require('./check-versions')()//检查node，npm版本。

process.env.NODE_ENV = 'production' //设置环境变量NODE_ENV值为production

const ora = require('ora') //设置打包时候控制台提示内容的设置。
const rm = require('rimraf')//node.js版本的rm -rf删除文件移除模块
const path = require('path')// 引入path模块
const chalk = require('chalk')// 引入显示终端颜色模块用于在控制台输出带颜色字体的插件
const webpack = require('webpack')//webpack 模块
const config = require('../config')//引用默认配置文件
const webpackConfig = require('./webpack.prod.conf')//// 引入webpack在production环境下的配置文件
//打包时候的动画
const spinner = ora({
  text:"打包中,请稍等...",
  color:"green"
})
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {//移除打包文件内容。
  if (err) throw err
  //进行打包
  webpack(webpackConfig, (err, stats) => {
    //打包完成
    spinner.stop()
    if (err) throw err
    //输出打包状态
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    //如果打包出现错误
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    //打包完成
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
