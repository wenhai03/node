const http = require('http')
const url = require('url')

let server = http.createServer(function () {
  console.log('111')
})
server.on('request', function (req, res) {
  // 报文
  // 请求发送过来 由三部分组成 行 头 体
  
  
  // curl => 命令工具可以手动发送请求 linux才支持  windows安装git是选择在cmd行中才可以
  // postman => 可以可视化操作
  
  // 方法 路径 协议 => 请求行
  // 请求方法有哪些 get post put delete options
  // 简单请求变为复杂的条件是 自定义header
  // restfulApi风格 用户的增删改查
  
  // options 预检请求 跨域时出现 跨域访问某个资源时 先发一个预检请求(复杂请求时才会发送)
  // 当跨域是并且复杂请求才会发options请求 (可以设置 有效时间 什么时候发送请求)
  
  // 路径可以传递参数 后面的参数 query
  console.log("req.method", req.method) // 获取请求方法 默认是大写，需要自己转
  // url模块可以处理url路径, 把路径解析成对象
  // console.log("url", url.parse(req.url, true)) // 获取请求路径 /后面的 和 # 前面的  #hash是给前端用
  let {pathname, query} = url.parse(req.url, true)
  // 请求行中可以通过query来进行传递参数
  console.log('pathname, query -> ', pathname, query)
  //请求头  key node默认都转成了小写
  console.log('req.headers', req.headers)
  // cookie数据传递
  
  // 请求体  必须能传递数据 post put可以传递数据
  // socket 包含着请求和响应 我们需要解析她，解析后会创建一个流，将数据放到流中，再去这个流中读取数据
  let arr = [] // 可读流的用法
  req.on('data', function (chunk) {
    console.log(chunk) // buffer
    arr.push(chunk)
  })
  req.on('end', function () {
    console.log(Buffer.concat(arr).toString())
  })
  
  
  res.end('2222') // 结束 + write 方法
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
