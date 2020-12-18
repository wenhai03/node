const mongoose = require('mongoose')

conn = mongoose.createConnection('mongodb://zhu:zhu@localhost:27017/zhufeng', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 创建一个学生表 学生名 入学时间  性别  年龄
// 存储的骨架结构

conn.on('connected', function () {
  console.log('连接成功')
})
