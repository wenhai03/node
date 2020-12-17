// 同步删除 链表的反转  从底下在删除

// 同步用 递归的方式来删除 遇到节点就处理当前的子节点，子节点处理完毕后删除自己
// 深度遍历(有儿子就处理儿子) 先序  后续 中序 层序遍历  (广度遍历)

const fs = require('fs')
const path = require("path")

function rmdirSync (dir) {
  // 看dir是不是目录
  let statObj = fs.statSync(dir)
  // 链表反转(有下一个节点就处理一下：递归)
  // 如果有子目录就先处理子目录：递归
  if (statObj.isDirectory()) {
    let dirs = fs.readdirSync(dir) // 如果是文件夹读取文件夹内容
    dirs.forEach(item => { // 处理子路径
      let currentPath = path.join(dir, item)
      rmdirSync(currentPath)
    })
    fs.rmdirSync(dir)
    
    console.log('文件夹', dir)
  } else { // 不是文件夹就是文件
    // 删除文件
    fs.unlinkSync(dir)
  }
  // 应该捕获异常
}

// rmdirSync('c')

// 1)回调问题 异步 串行删除

function rmdir (dir, cb) { // 有下一层就先处理下一层 (深度优先的特色 )
  fs.stat(dir, (err, statObj) => {
    if (statObj.isDirectory()) {
      fs.readdir(dir, function (err, dirs) {
        // 1)先拼接路径 在想着一个个的来处理
        dirs = dirs.map(item => path.join(dir, item))
        
        console.log('dirs000  -> ', dirs)
        let index = 0
        
        function next () {
          if (index === dirs.length) return fs.rmdir(dir, cb)
          // 将删除操作通过next进行串联，第一个删除完毕后删除第二个，儿子都删除完毕后删除父节点
          let current = dirs[index++]
          rmdir(current, next)
        }
        
        next()
      })
    } else {
      fs.unlinkSync(dir) // 删除文件即可
    }
  })
  
}

rmdir('a', function () {
  console.log('删除成功')
})
