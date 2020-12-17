const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

http.createServer((req, res) => {
  let {pathname} = url.parse(req.url)
  let filePath = path.join(__dirname, 'public', pathname)
  
  // 每次都像服务器发请求，但是不缓存
  res.setHeader('cache-control', 'no-cache')  // no-store 不能有对比缓存，浏览器缓存中根本不存储
  
  // 如果静态资源没有发生变化 返回之前的文件就好 (直接找缓存)
  // 根据文件的修改时间来判断这个文件是否发生变化
  
  // 服务器给浏览器一个 Last-Modified 浏览器下次请求时候 会还给浏览器 If-Modified-Since
  
  
  // 1)内容没有变，但是修改时间变化了  2) 1s之内变化了n次 是监控不到
  // 3)根据文件内容来对比 (不适合大文件)
  fs.stat(filePath,(err, statObj) => {
    const ctime = statObj.ctime.toGMTString()
    const since = req.headers['if-modified-since']
    // 希望增加一个标识 这文件的最后修改时间
    res.setHeader('Last-Modified', ctime);
    if (since === ctime) { // 文件没有变化
      res.statusCode = 304
      return res.end()
    }
    
    
    if (err) {
       res.statusCode = 404
       return res.end('Not Found')
     }
     if (statObj.isFile()) {
       fs.createReadStream(filePath).pipe(res)
     } else{
       return res.end()
     }
  })
}).listen(3000)

