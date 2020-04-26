import { name, data }

  from '../init'; // 引入 init.js 存于 name ， (js后缀可以省略)
import '../css/index.less';

console.log('=======>>name', name);
setInterval(() => {
  document.getElementsByClassName('box')[0].innerHTML = new Date(data).getSeconds();
}, 1000);

const arr = [1, 2, 3];
console.log('========>>数组', [...arr]);

const pFun = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0
      })
    }, time);
  })
}

pFun(1000).then(res => {
  console.log(res)
})
