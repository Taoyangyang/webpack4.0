const name = 'newApp';
let data = null;
setInterval(() => {
  data = new Date().getTime();
}, 1000);

export {	// ECMAScript 6 语法 ， 向外暴露接口供其他文件调用时使用
  name,	// 将变量 name 指定为向外暴露成员
  data,
};
