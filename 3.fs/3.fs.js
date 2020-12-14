// fs fileSystem 和文件相关的方法 文件夹 文件 都在这里
// 里面的方法一般有两种类型  1 同步 sync   2 异步 没有sync

const fs = require('fs')
const path = require('path')

// 1.如果我们是读取文件 读取到的结果默认都是buffer类型
// 2.写入的时候，会清空文件内容，并且以utf8格式类型写入
/*fs.readFile(path.resolve(__dirname, 'node.md'),  function (err, data) {
  console.log('data', data)
})*/
// 运行时如果用相对路径 会以process.cwd() 来切换路径 可能会导致不同路径下运行结果不同
/*fs.readFile(path.resolve(__dirname, 'test.jpg'), 'base64', function (err, data) {
  // 执行图片转化成base64，采用utf8格式会乱码
  console.log('data', data)
  // appendFile    flag: r => read    w=write    a=append
  fs.writeFile(path.resolve(__dirname, 'test1.jpg', data, function (err, data) {
    console.log('copy -> ')
  }))
})*/


// 1.读取的内容都会放到内存中
// 2.如果文件过大会浪费内存
// 3.淹没可用内存 大型文件不能采用这种方式进行操作 64k 以上的文件做拷贝操作就尽量不要使用readFile实现
