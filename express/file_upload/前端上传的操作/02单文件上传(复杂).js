/*
* 单文件上传的复杂版本
* 1.解决跨域问题
*   下载一个包 cors
* 2.接收文件
*   2-1 准备一个文件夹，在服务器上
*       存储上传的文件
*   2-2 需要一个插件帮助
*       multer
*       下载
*       导入
*   2-3 生成一个仓库信息
*       multer.deskStorage({ 配置 })
*         destination: function () {}  设定存储路径
*         filename: function () {}      设定文件名称
*       返回值：是一个仓库信息
*   2-4 使用multer 生成一个接收器
*         接收器里面配置一个仓库信息
*         语法：multer({ storage: 仓库信息 })
*
* */

const express = require('express')
const path = require('path')
const router = express.Router()
const cors = require('cors') // 解决跨域问题 下载包cors
const multer = require('multer') // 导入 multer 插件
const app = express()

// 挂载上 cors
app.use(cors())

// 使用 multer 生成一个仓库信息
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // req 本次请求的信息
    // file 本次请求的文件
    // cb 回调函数，利用回调函数来设定 存储路径
    cb(null, './img/')
  },
  filename: function (req, file, cb) {
    // req 本次请求的信息
    // file 本次请求的文件
    // cb 回调函数，通过回调函数来设定 文件名称
    // console.log('file -> ', file)
    // 从file信息里面把后缀名拿出来，自己拼接随机数
    const tmp = path.extname(file.originalname)
    cb(null, `avatar_${new Date().getTime()}-${Math.random().toString().slice(2)}${tmp}`)
  },
})

// 配置接收器，带有仓库信息
const fileUpload = multer({storage})

router.post('/upload', fileUpload.single('avatar'), (req, res) => {
  console.log('接收请求')
  console.log('req.file', req.file)
})

app.use(router)

app.listen(8080, () => console.log(8080))
