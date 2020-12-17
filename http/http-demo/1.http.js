// http是基于tcp 封装了一些规范 http中的header 主要学就是header 应用层
const http = require('http')

let server = http.createServer(function () {
  console.log('111')
}) // 内部基于的是EventEmitter
server.on('request', function (req, res) { // 访问服务的时候就触发此函数
  console.log('222')
  // req 代表的是客户端的信息  res代表的是服务端响应的结果
  // req 是可读流 基于Stream模块 on('data')  on('end')
  // res 是可写流 基于Stream模块
  // write()  end()  支持string 和 buffer
  // res.write('ok')
  // 完事后要调用 end
  res.end('ok1111') // 结束 + write 方法
})


let port = 3000
server.listen(3000, function () {
  console.log(`server start ${port}`)
})

server.on('error', function(err){
  if (err.code === 'EADDRINUSE') {
    server.listen(++port)
  }
})

// nodemon     node monitor node的监视器 可以监视文件的变化 自动重启
// cnpm i nodomon -g

// nodemon + 文件名来实现 可以配置文件
// pm2 进程管理
// 端口呗占用 会错  listen EADDRINUSE: address already in use :::3000
