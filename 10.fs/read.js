// 我们想做一个拷贝功能 把一个文件读取到内存中，将读取的写入到文件中

const fs = require('fs')

// ** 将代码进行拆分 => 发布订阅模式 代码的解构 通过发布订阅模式 events模块

// 读取的文件必须存在，写入的时候默认会采用utf-8格式将内容写入发哦文件中
// 如果文件中有内容会清空，如果文件不存在会创建
function copy (source, target, cb) {
  // 读一点操作一点(流) 底层还是文件操作
  const buffer = Buffer.alloc(3)
  let offsetRead = 0
  let offsetWrite = 0
 
  fs.open(source, 'r', (err, rfd) => { // fd file descriptor 文件描述符 number
    console.log(rfd)
    // 读取其实是将内容 写入发哦文件中
    // 从buffer的哪个位置写入 写入多少个 从文件的哪个位置开始读取
  
    fs.open(target, 'w', (err, wfd) => {
      // 写入文件 从buffer的第几个位置 写入几个 从文件的哪个位置开始写
      function next() { // 最后一次可能读取到的是
        fs.read(rfd, buffer, 0, 3, offsetRead, function (err, bytesRead) {
          offsetRead += bytesRead
          //console.log('bytesRead -> ', bytesRead) // 真实读取文件的个数
          // 第一个rwx 表示我可以操作文件 读取 写入 执行
          // 第二个r-x 表示就是当前所属组
          // 第三个r-x 表示其他人
          // 权限 d（rwx）（r-x）（r-x） 4读取 2写入 1执行
          // chmod -R 777
          fs.write(wfd, buffer, 0, bytesRead, offsetWrite, (err, written) => {
            offsetWrite += written
            if (bytesRead === 3) {
              next()
            } else {
              fs.close(rfd, ()=> {})
              fs.close(wfd, ()=> {})
              cb()
            }
          })
        })
      }
  
      next()
      
    })
  })


  // fs.open  fs.read  fs.write  fs.close 一般用不到 这是文件流的原理
  // fs.readFile(source, function (err, data) { // 读取文件会淹没没可用内存
  //   if (err) return cb(err)
  //   fs.writeFile(target, data, cb)
  // })
}

copy('./name.txt', 'copy.txt', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('拷贝完成 -> ')
})
