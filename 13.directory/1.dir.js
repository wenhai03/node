// 对文件夹操作 也是fs系统干的事

const fs = require('fs')
const path = require('path')
// 项目构建 文件的合并操作

// 读当前目录的子目录 ['a.js', 'b']
// let dirs = fs.readdirSync(path.join(__dirname, 'a'))
// console.log(dirs)

//  创建目录  删除目录  创建文件writeFile  删除文件 给文件改名字

// fs.mkdirSync(path.join(__dirname, 'c')) // 如果目录已经存在不能创建目录
// fs.exitsSync 只有同步的  (异步的被废弃了)  fs.access 是否能访问 如果访问不到会发生错误

// fs.mkdirSync('c/b/b/d')
// 遍历 文件夹就是一个树形结构(遍历树)
// fs.rmdirSync('c')


// 第一步先去读取a目录中的内容，去查找子目录是什么类型
let dirs = fs.readdirSync('./a')
dirs.map(item => { // 拼接父路径
  let currentPath = path.join('a', item)
  let statObj = fs.statSync(currentPath) // 文件的大小 文件的修改时间 创建时间
  // 不是文件就是文件夹
  if (statObj.isDirectory()) {
    fs.rmdirSync(currentPath)
  } else {
    fs.unlinkSync(currentPath)
  }
  
})

// fs.readdir   fs.stat
// fs.unlink    fs.rename
// fs.mkdir     fs.rmdir


// linux  直接删除目录 rm -rf
















