'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
//根据不同的环境，引入不容的Source Map 配置文件 
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  //vue文件中的css loader 配置
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    //生产环境下就会把css文件抽取到一个独立的文件中
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,//css Source map文件的配置
  cacheBusting: config.dev.cacheBusting,//css Source map 文件缓存控制变量
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
