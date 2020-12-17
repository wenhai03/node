const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const crypto = require('crypto')

const hash = (value) => { // value ->  string | buffer
  return crypto.createHash('md5').update(value).digest('base64')
}

http.createServer((req, res) => {
  let {pathname} = url.parse(req.url)
  let filePath = path.join(__dirname, 'public', pathname)
  
  res.setHeader('cache-control', 'max-age=5')  // no-store 不能有对比缓存，浏览器缓存中根本不存储
  
  // 一般情况下两个都对比
  fs.stat(filePath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      return res.end('Not Found')
    }
    const ifNoneMatch = req.headers['if-none-match']
    // 根据特定的标识组成md5  比如文件的大小 314
    let md5 = hash(fs.readFileSync(filePath)) // 文件的几行 文件的大小 ctime
    // 服务器给浏览器的响应头添加了 Etag: vpsa9NhjqHS1x8F1PhA03Q==，
    // 下次再请求浏览器会携带 If-None-Match: vpsa9NhjqHS1x8F1PhA03Q==
    res.setHeader('Etag', md5)
    
    console.log('000ifNoneMatch===md5 -> ', ifNoneMatch===md5)
    
    if (ifNoneMatch === md5) {
      res.statusCode = 304
      return res.end()
    }
    
    
    if (statObj.isFile()) {
      fs.createReadStream(filePath).pipe(res)
    } else {
      return res.end()
    }
  })
}).listen(3000)

