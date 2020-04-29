//src/addAuthor.js
const {
  getOptions,
  stringifyRequest,
  parseString,
  urlToRequest,
  getHashDigest,
  interpolateName,
  isUrlRequest,
  getCurrentRequest,
  getRemainingRequest
} = require('loader-utils')

module.exports = function (source) {
  // getOptions 获取loader中的 options 中的参数
  const options = getOptions(this);
  console.log("options================================>", options);
  
  // // stringifyRequest 将loader模块中的绝对路径转化为相对路径
  // const stringify_request = stringifyRequest(this, request);
  // console.log("stringifyRequest================================>", stringify_request);
  
  // // parseString 将字符串转化为json对象
  // const parse_string = parseString(this, request);
  // console.log("parseString================================>", parse_string);
  
  // // urlToRequest 将字符串转化为json对象
  // const url_to_rquest = urlToRequest(url, root);
  // console.log("urlToRequest================================>", url_to_rquest);
  
  // // getHashDigest 通过限制字符长度获取文件部分哈希值
  // const get_hash_digest = getHashDigest(buffer, hashType, digestType, maxLength);
  // console.log("getHashDigest================================>", get_hash_digest);
  
  // // interpolateName 自定义资源名称、hash等
  // const interpolate_name = interpolateName(this, name, options);
  // console.log("interpolateName================================>", interpolate_name);
  
  // // isUrlRequest 判断是否是路径 
  // const is_url_request = isUrlRequest(url, root);
  // console.log("isUrlRequest================================>", is_url_request);
  
  // getCurrentRequest 获取当前请求
  const get_current_request = getCurrentRequest(this);
  console.log("getCurrentRequest================================>", get_current_request);
  
  // getRemainingRequest 获取请求
  const get_remaining_request = getRemainingRequest(this);
  console.log("getRemainingRequest================================>", get_remaining_request);
  
  
  // 替换文本内容
  console.log("source================================>", source);
  
  let newSourve = `
    // author: ${options.author}
    // date: ${options.date}
    ${source.replace(/\[name\]/g, options.pName)}
  `
  console.log("newSourve=======================>", newSourve);
  return `export default ${JSON.stringify(newSourve)}`
}