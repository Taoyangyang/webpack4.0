const path = require('path');					//设置路径

module.exports = {								//配置正式开始
  	entry: {									//设置入口
  		index: './src/index.js'
  	},					
  	output: {									//设置打包出口
    	path: path.resolve(__dirname, 'dist'),	//打包文件放在这个目录下
    	filename: '[name].js'					//打包文件名
  	},
  	module: {									//loader 相关配置
  		rules: [{
        	test: /\.css$/,							//正则表达式：根据后缀为 .css 的文件来匹配 css 文件
        	use: [ 'style-loader', 'css-loader' ]	//匹配搭配 css 文件后，打包时使用以下 loader 来处理文件
      	}]
  	},									
  	plugins:[],									//插件 相关配置
  	mode: 'development'							//设置模式为开发者模式
};