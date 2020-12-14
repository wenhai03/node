// 文件基于流进行了封装 封装了基于文件的可读流和可写流

const fs = require('fs')
const path = require('path')
// 内部是继承了stream模块 并且基于fs.open  fs.read  fs.close方法
let rs = fs.createReadStream(path.resolve(__dirname, 'test.txt'), {
  flags: 'r', // 创建可读流的标识是r 读取文件
  encoding: null, // 编码默认null buffer
  autoClose: true, // 读取完毕后自动关闭
  start: 0, // 包前又包后 字节数
  end: 4,
  highWaterMark: 2 // 12 34 5  如果不写默认是64*1024
})
// console.log(rs)

rs.on('error', function (err) {
  console.log('error', err)
})
rs.on('open', function (fd) {  // rs.emit('open')
  console.log('fd', fd)
})

// let str = ''
let arr = []
rs.on('data', function (chunk) {
  // str += chunk
  rs.pause()  // 默认一旦监听了on('data')方法会不停的触发data方法
  console.log(chunk)
  arr.push(chunk)
})

// 文件的开始到结束都读取完毕了
rs.on('end', function (chunk) { // 十六进制
  // console.log(chunk.toString())
  console.log(Buffer.concat(arr).toString())
})

rs.on('close', function () {
  console.log('close -> ')
})


// 发布订阅中出异常 error
// 可读流对象 必须有on('data') on('end') 如过时文件流在提供两个 open /close
// 控制读取速率 rs.pause   rs.resume

/*
setInterval(() => {
   rs.resume()
  console.log('setInterval -> ')
}, 1000)
*/


class Parent {
  read () {
    this._read()
  }
}

class Child extends Parent{
  _read(){
    console.log('_read ok')
  }
}

let c = new Child()

c.read()




















