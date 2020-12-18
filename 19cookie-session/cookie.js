const http = require('http')
const querystring = require('querystring')

http.createServer((req, res) => {
  if (req.url === '/read') {
    // 读取cookie  // age=10; name=111 => a=1&b=2
    res.end(JSON.stringify(querystring.parse(req.headers.cookie, '; ')))
    
  } else if (req.url === '/write') {
    // 写入cookie
    // domain 针对某个域名设置 不允许跨域(父子域可以设置) 可以限制cookie传输的范围  domain = .zf.cn
    // path / 表示路径带 / 的就可以设置 path=/write
    // expires/max-age 限制有效期max-age=10
    // http-only 如果服务器设置后客户端 无法通过代码获取到cookie 不能完全解决安全性问题
    // secure 要求是https才传输cookie
    // same-site csrf中使用
    
    res.setHeader('Set-Cookie', [`name=zf; httpOnly=true`, `age=10`])
    res.end('write ok')
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
  
}).listen(3000)
