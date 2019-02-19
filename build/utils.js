'use strict'
const path = require('path') //引用node path模块
const config = require('../config')//引用config文件
const ExtractTextPlugin = require('extract-text-webpack-plugin') //将所有的css移动到独立分离的css文件，
  //因此样式将不会在内嵌到JS bundle中，而是放到单独的css文件中。如果你的样式文件大小较大，这样会更快提前加载，因为CSS bundle 会跟JS bundle并行加载。
const packageConfig = require('../package.json')
//导出文件的位置，根据环境判断开发环境和生产环境。（config中的index.js文件中的build.assetsSubDirectory或dev.assetsSubDirectory）
//生成编译输出的二级目录
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  //path.posix是path模块跨平台的实现(不同平台路径表示的不一样)
  return path.posix.join(assetsSubDirectory, _path)
}
//为不同的css预处理器提供一个统一的生成方式，也就是统一处理各种css类型的打包问题。
//这个是为在vue文件中的style中使用的测试赛类型
exports.cssLoaders = function (options) {
  options = options || {}
//打包css模块
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap  
    }
  }
//编译postcss模块
  const postcssLoader = {
    //使用postcss-loader来打包postcss模块
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader] //判断是否使用了postcssLoader

    if (loader) { //如果指定了具体的loader的名称
      loaders.push({ //想loaders的数组中添加该loader对应的加载器。*（数组的加载器是从右向左执行的）
        loader: loader + '-loader',//loader加载器名称
        options: Object.assign({}, loaderOptions, { //对应的加载器的配置对象
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    //如果指定了需要提取静态文件则使用ExtractTextPlugin.extract({})来包裹我们的各种css处理器
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
         // fallback这个选项我们可以这样理解
        // webpack默认会按照loaders中的加载器从右向左调用编译各种css类型文件。如果一切顺利，在loaders中的
        // 各个加载器运行结束之后就会把css文件导入到规定的文件中去，如果不顺利，则继续使用vue-style-loader来处理
        // css文件
        fallback: 'vue-style-loader'
      })
    } else {
        // 如果没有提取行为，则最后再使用vue-style-loader处理css
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),//css-loader
    postcss: generateLoaders(),//postcss-loader
    less: generateLoaders('less'),//less-loader
    sass: generateLoaders('sass', { indentedSyntax: true }), //sass-loader 后面的选项表明sass使用的是缩进的语法
    scss: generateLoaders('sass'),//scss-loader
    stylus: generateLoaders('stylus'),//stylus-loader stylus文件有两种后缀名.stylus和styl.
    styl: generateLoaders('stylus') //stylus-loader
  }
}

// Generate loaders for standalone style files (outside of .vue)
//使用这个函数为独立的style文件创建加载器配置
exports.styleLoaders = function (options) {
  const output = [] //保存加载器的变量
  const loaders = exports.cssLoaders(options) //获取所有css文件类型的loaders

  for (const extension in loaders) {
    const loader = loaders[extension]
    //生成对应的loader配置
    output.push({ 
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return //只展示错误的信息

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()
    //需要展示的错误信息的内容
    notifier.notify({
      title: packageConfig.name,//通知的标题
      message: severity + ': ' + error.name,//通知的主题内容
      subtitle: filename || '',//副标题 
      icon: path.join(__dirname, 'logo.png')//通知展示的icon
    })
  }
}
