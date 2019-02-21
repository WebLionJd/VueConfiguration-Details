'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') //用于压缩css文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//用于压缩js文件

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')
//合并公共配置和生产环境独有的配置返回一个用于生产环境的webpack配置文件
const webpackConfig = merge(baseWebpackConfig, {
  module: {//生产环境的loader配置
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap, // source map 将编译后的代码映射回原始源代码
      extract: true,//在生产环境中使用extract选项，这样就会把thunk中的css代码抽离到一份独立的css文件中去
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,//导报文件的根目录
    filename: utils.assetsPath('js/[name].[chunkhash].js'), //打包文件名称  name 模块名称 chunkhash chunk内容的hash
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')//[id]也是一个占位符，表示的是模块标识符(module identifier)
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({ //压缩js的基本配置
      uglifyOptions: {
        compress: {
          warnings: false // 在删除未使用的变量等时，显示警告信息，默认就是false
        }
      },
      sourceMap: config.build.productionSourceMap, // 使用 source map 将错误信息的位置映射到模块（这会减慢编译的速度），而且这里不能使用cheap-source-map
      parallel: true //使用多进程并行运行和文件缓存来提高构建速度
    }),
    // extract css into its own file
    //提取css文件到一个独立的文件中去
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,//
     // 从所有额外的 chunk(additional chunk) 提取（默认情况下，它仅从初始chunk(initial chunk) 中提取）
     // 当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true

    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
        // 使用这个插件压缩css，主要是因为，对于不同组件中相同的css可以剔除一部分
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap //// cssProcessor使用这些选项决定压缩的行为
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,//true || 'head' || 'body' || false将所有资产注入给定的模板或templateContent。当传递true或'body'时，所有javascript资源将被放置在body元素的底部。'head'将把脚本放在head元素中
      minify: {
        removeComments: true, //移除注释
        collapseWhitespace: true,//去除空格和换行
        removeAttributeQuotes: true//尽可能的去除属性中的引号和空属性
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' //按照依赖关系进行排序
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),     // 根据模块的相对路径生成一个四位数的hash作为模块id
    // enable scope hoisting 这种连结行为被称为“作用域提升(scope hoisting)”。
    //过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。这些打包函数使你的 JavaScript 在浏览器中处理的更慢。相比之下，
    //一些工具像 Closure Compiler 和 RollupJS 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    //CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。
    //通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用。这个带来页面速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，
    //而不是每次访问一个新页面时，再去加载一个更大的文件。
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',// // filename: "vendor.js"(给 chunk 一个不同的名字)
      minChunks: Infinity /// (随着 entry chunk 越来越多，
      // 这个配置保证没其它的模块会打包进 vendor chunk)
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true, // // (选择所有被选 chunks 的子 chunks)
      minChunks: 3// // (在提取之前需要至少三个子 chunk 共享这个模块)
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',//目标资源名称。[file]会被替换成原资源。[path]会被替换成原资源路径，[query]特换成原查询字符串
      algorithm: 'gzip',//可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),//处理所有匹配此{RegExp}的资源
      threshold: 10240,//只处理比这个大的资源，大小按字节计算
      minRatio: 0.8//只有压缩率别这个值小的资源才会被处理。
    })
  )
}

if (config.build.bundleAnalyzerReport) { //可视化视图查看器 将捆绑内容表示为方便的交互式可缩放树形图 npm run build -report
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
webpackConfig.externals={ //配置不打包的文件
    vue:'Vue',
    'element-ui': 'ELEMENT',
    // 'vue-router':'VueRouter'
  }
module.exports = webpackConfig
