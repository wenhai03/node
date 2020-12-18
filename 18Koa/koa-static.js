const path = require('path')
const fs = require('fs').promises  // 异步读取
const {readStream, createReadStream} = require('fs')
const mime = require('mime')

function static(dirname) {
  return async (ctx, next) => {
    let filePath = path.join(dirname, ctx.path)
    
    try {
      let statObj = await fs.stat(filePath)
      if (!statObj.isFile()) {
        // 文件夹
        filePath = path.join(filePath, 'index.html')
        // 判断文件夹中是否有html
        await fs.access(filePath)
      }
      // 增加文件类型
      ctx.type = mime.getType(filePath) + ';charset=utf-8'
      ctx.body = createReadStream(filePath)
      
      
    } catch (e) {
      // 自己处理不了 交给其他人
      return next()
    }
  }
}

module.exports = static
