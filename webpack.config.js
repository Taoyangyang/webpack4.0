const path = require('path'); //设置路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); //HTML编译插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件
const AutoPreFixer = require('autoprefixer'); //css、less等自动添前缀
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); //引入清除文件插件
const copyWebpackPlugin = require('copy-webpack-plugin'); //复制静态文件
const OptimizeCss = require('optimize-css-assets-webpack-plugin');  //css 压缩

const resolve = dir => {
  return path.join(__dirname, dir)
}

//是否开发者模式(true-->>开发模式 false-->>产品模式)
const devMode = process.env.NODE_ENV === 'development';
console.info("======NODE_ENV======>>>", process.env.NODE_ENV)
console.info("======isDevMode======>>>", devMode)


//===========================css/less 的rules公共抽取 ==================================
const commonCssLoader = [
  devMode ? 'style-loader' : {
    loader: MiniCssExtractPlugin.loader, //如果是开发模式则使用style 否则创建一个css文件。
    options: {
      // 这里可以指定一个 publicPath
      // 默认使用 webpackOptions.output中的publicPath
      // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
      // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
      // publicPath: '../',
      publicPath: devMode ? './' : '../', // 根据不同环境指定不同的publicPath
      hmr: devMode, // 仅dev环境启用HMR功能
    }
  }, {
    loader: 'css-loader', //加载程序来处理css文件 css-loader一定要放在style后面
    options: {
      importLoaders: 2 //设置后 就算使用import引入样式，也会执行后面的loader
    }
  }, {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        AutoPreFixer()
      ]
    }
  },
]


module.exports = { // 配置正式开始
  mode: process.env.NODE_ENV, // 设置模式(由package.json的命令中 获取设置的mode)
  // 开发环境
  devServer: {
    hot: true, // 热更新
    open: true, // 配置自动启动浏览器
    disableHostCheck: true,
    contentBase: './dist', // 我们把编译后的目录 定为发布目录
    compress: true, // 是否展示进度条
    host: '0.0.0.0', // host地址
    port: 9000, // 开发环境启动端口
    proxy: {
      '/action': 'http://127.0.0.1:8080/'
    }
  },
  entry: { // 设置入口
    index: './src/js/index.js',
    second: './src/js/second.js'
  },
  output: { // 设置打包出口
    path: resolve('dist'), // 打包文件放在这个目录下
    filename: './js/[name].[hash:10].js', // 打包文件名
    chunkFilename: './js/[name].[hash:10].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 自动解析确定的扩展(能够使用户在引入模块时不带扩展名)
    alias: {
      '@': './src'
    }
  },
  module: { // loader 相关配置
    rules: [{
      test: /\.(sa|sc|c)ss$/, // 可以打包后缀为sass/scss/css的文件
      use: [...commonCssLoader],
    },
    {
      test: /\.less$/,
      use: [
        ...commonCssLoader,
        'less-loader' // less转换成css文件
      ]
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/, // 忽略node_modules或bower_components文件夹
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', // 使用这个预设，会根据浏览器来选择插件转化ES5
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本的浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }]
          ]
        }
      }]
    },
    // {
    //   // 正常说，一个文件只能被一个loader处理，当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
    //   // 当要有 eslint 风格检测的时候，要先执行 eslint 然后在执行 babel
    //   test: /\.js$/,
    //   exclude: /(node_modules|bower_components)/, // 忽略node_modules或bower_components文件夹
    //   enforce: 'pre', // 优先执行
    //   use: [{
    //     loader: 'eslint-loader',
    //     options: {
    //       fix: true, // 自动修复eslint错误
    //     }
    //   }]
    // },
    {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: {
        // loader: 'file-loader',
        loader: 'url-loader', // url-loader 只是比 file-loader 多了limit属性，控制base64的转换大小限制
        options: {
          limit: 8 * 1024,
          name: '[name].[hash:10].[ext]', // 图片编译后位置及名字
          // publicPath: "./images/",
          outputPath: 'images/',
          // 问题：[ url | file ]-loader 默认使用es6模块化解析，而html-loader引入图片是使用的commonJs
          //      解析时会在url中出现 [Object Module]
          // 解决：关闭 [ url | file ]-loader 中的esModule，使用commonJs解析
          esModule: false,
        }
      }
    },
    {
      test: /\.(mp3|mp4)(\?.*)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: './assets/[name].[ext]', // mp3不能用hash html只会用源码的文件名
        }
      }
    },
    {
      test: /\.html$/,
      loader: 'html-loader',  // 处理html文件中的图片，负责引入img，从未能被url-loader或file-loader处理
    }, {
      test: /\.txt$/,
      loader: resolve('./src/loader/addAuthor.js'),
      options: {
        author: '陶冶',
        date: new Date().toLocaleString(),
        pName: '崇文',
        name: './assets/index.txt',
      }
    }]
  },
  // 插件 相关配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 需要编译的html源文件
      filename: 'index.html', // 编译后的文件名
      minify: {
        collapseWhitespace: true, // 编译后的html文件去掉空格
        removeComments: true, // 移除注释
      }
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? './css/[name].css' : './css/[name].[hash:10].css', // 如果是生产模式则使用hash文件名
      chunkFilename: devMode ? './css/[id].css' : './css/[id].[hash:10].css',
    }),
    new copyWebpackPlugin([{
      from: __dirname + '/src/assets',
      to: __dirname + '/dist/assets',
    }]),
    new CleanWebpackPlugin(), // 自动删除webpack里的dist目录
    new OptimizeCss(), // css压缩
  ],
};