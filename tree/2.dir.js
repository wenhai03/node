const fs = require('fs')
const path = require('path')


// 1.如何创建文件夹  2.如何删除文件 3.如何判断是不是文件夹  4.文件夹放的有什么内容

// 这些方法也分同步和异步
// 这里我们以异步为例，异步代码稍微的复杂一些


fs.mkdir('c/b/c.js', (err) => {
  // console.log(err) // 创建目录前 需要保证父目录存在
})

fs.rmdir('a', err => {
  // console.log(err) // 删除目录时需要保证目录的内容是空
})

fs.readdir('a', (err, dirs) => {
  dirs = dirs.map(item => {
    let p = path.join('a', item)
    fs.stat(p, function (err, stat){
      console.log(stat.isDirectory(), stat.isFile())
      if (stat.isFile()) {
        fs.unlink(p, ()=> {})
      }
    })
    
    return p
  })
  // 读取的结果只有儿子一层
  // console.log('dirs -> ', dirs)
})

// console.log(' -> ', path.join('c', 'item'))
