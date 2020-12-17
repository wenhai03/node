const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

http.createServer((req, res) => {
  let {pathname} = url.parse(req.url)
  let filePath = path.join(__dirname, 'public', pathname)
  // nginx里可以直接通过add_header方式来设置
  // 强制缓存的状态码 依旧是200 不针对根路径生效
  
  // cache-control: no-store 每次都请求服务器， 不存储缓存 (浏览器点击了 Disable cache相当于 no-store)
  // cache-control: no-cache 每次都请求服务器， 但是会缓存
  res.setHeader('cache-control', 'max-age=10') // 10s内不会再向服务器发送请求
  res.setHeader('Expires', new Date(Date.now()+10 *1000).toGMTString())
  // memory cache  /  disk cache (浏览器会根据使用次数 文件类型 自动的去缓存)
  
  fs.stat(filePath,(err, statObj) => {
     if (err) {
       // window -> C:\Users\xxxxxxx\favicon.ico  浏览器自己会去请求这个文件  (看心情请求)
       
       res.statusCode = 404
       return res.end('Not Found')
     }
     if (statObj.isFile()) {
       // content-type mime
       fs.createReadStream(filePath).pipe(res)
     } else{
       return res.end()
     }
  })
}).listen(3000)

