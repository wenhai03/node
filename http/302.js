const path = require('path')
const url = require('url')
const fs = require('fs')
const http = require('http')

// 希望根据不同的访问路径跳转到 不同的网站上
// 前后端分离 (前端路由负责前端跳转，表单提交靠的是重定向)

// 用手机访问这个页面 跳转到baidu    否则跳转到腾讯

http.createServer((req, res) => {
  let {pathname} = url.parse(req.url)
  let filePath = path.join(__dirname, 'public', pathname)
  
  let userAgent = req.headers['user-agent']
  
  if (userAgent.match(/iPhone/)) {
    res.statusCode = 302
    res.setHeader('Location', 'http://www.baidu.com')
    res.end()
  } else {
    res.statusCode = 302
    res.setHeader('Location', 'http://www.qq.com')
    res.end()
  }
  
  /*fs.stat(filePath, (err,statObj) => {
     if (err) {
       res.statusCode = 404
       return res.end('Not Found')
     }
     if (statObj.isFile()) {
       fs.createReadStream(filePath).pipe(res)
     }
  })*/
  
}).listen(3000)
