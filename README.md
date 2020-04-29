## 使用webpack 4.0搭建项目框架
---
1. **使用常用的一些loader：**

   处理样式的：
   > yarn add css-loader file-loader less less-loader style-loader url-loader -D

   自动添加css浏览器兼容前缀：
   > yarn add postcss-loader autoprefixer -D

   css文件分离打包
   > yarn add mini-css-extract-plugin -D

   处理js（es6转es5）：
   > yarn add yarn add @babel/core @babel/preset-env babel-loader core-js -D

   eslint风格检测：
   > yarn add eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D

   等等。。。
   
2. **常用的plugins：**
   
    html文件编译：
    > yarn add html-webpack-plugin -D

    打包清理：
    > yarn add clean-webpack-plugin -D

    热更新： 
    > yarn add webpack-dev-server -D

    css压缩：
    > yarn add optimize-css-assets-webpack-plugin -D

    静态文件复制：
    > yarn add copy-webpack-plugin

    等等。。。


3. **开发、生成环境配置**
  
4. **自定义loader开发**