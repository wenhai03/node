const http = require('http')
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // 数据格式
    console.log('content-type', req.headers['content-type'])
    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk
    })
    
    req.on('end', () => {
      console.log('postData', postData)
      // 在这里返回，因为是异步
      res.end('hello world')
    })
  }
})

server.listen(8000)
