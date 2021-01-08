/*
* 单文件上传的简单版本
* 1.解决跨域问题
*   下载一个包 cors
* 2.接收文件
*   2-1 准备一个文件夹，在服务器上
*       存储上传的文件
*   2-2 需要一个插件帮助
*       multer
*       下载
*       导入
*   2-3 需要使用multer 配置一个接收器
*       => multer({ dest: '你存放文件的路径' })
*   2-4 使用接收器去接收
*       哪个路由需要接收文件，配置在哪一个路由上
*       写在路由标识符的后面，路由处理函数的前面
*       接收器.single('前端上传的文件 key')
*   2-5 在路由处理函数里面
*       会在 req 上多加一个信息叫做 file
*       就是你上传的文件信息
*   注意：会把你的文件存储起来，但是没有后缀，随机命名
*
* */

const express = require('express');
const router = express.Router();
const cors = require('cors') // 解决跨域问题 下载包cors
const multer = require('multer') // 导入 multer 插件
const app = express()

// 挂载上 cors
app.use(cors())

// 配置的这个接收器，将来接收到的文件直接存储在指定目录
const fileUpload = multer({dest: './img/'})

router.post('/upload', fileUpload.single('avatar') , (req, res) => {
  console.log('接收请求')
  console.log('req.file', req.file)
})

app.use(router)

app.listen(8080, ()=> console.log(8080))
