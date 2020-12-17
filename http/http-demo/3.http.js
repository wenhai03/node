const http = require('http')
const url = require('url')

let server = http.createServer()
server.on('request', function (req, res) {
  // node的主线程是单线程
  // 多个请求来了 线性处理 阻塞 (异步的i/o) 如果有大量的计算就会导致卡死
  // console.log('req.url', req.url)
  // let sum = 0 // 工程化  前后端分离  基于react vue的ssr
  // if (req.url === '/sum') { // 主要靠的是切换快  先到先得
  //   console.log('11122')
  //   for (let i = 0; i< 10000000000; i++) {
  //     sum+=i
  //   }
  //
  //   res.end( sum+' ')
  // } else {
  //   console.log(22)
  //   res.end('ok111000000')
  // }
  
  // 响应也分为三部分 响应行 响应头  响应体
  res.statusCode = 200 // 成功 不能 瞎写 其实也可以瞎写但是浏览器不认
  // res.statusMessage = 'ok1' // 不建议自己瞎编状态码
  res.setHeader('a', '11') // 自定义header 来描述响应的结果
  res.end('ok') // 将内容返回给浏览器 如果是直接访问就显示到页面上，如果是通过ajax来访问就返回到ajax中的结果中
  
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
