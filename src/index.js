import {name, data} from './init';	//引入 init.js 存于 name ， (js后缀可以省略)
import './css/index.css';

console.log(name,"=====>>")
setInterval(()=>{
	document.getElementsByClassName('box')[0].innerHTML = new Date(data).getSeconds();
}, 1000)
