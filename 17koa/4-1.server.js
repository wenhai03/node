const Koa = require('koa')
const app = new Koa()
const bodyparser = require('./bodyparser')

// 登录的功能 访问/login 的时候显示一个表单 => 提交数据 post /login 解析请求体 返回结果
// bodyparser返回async函数
app.use(bodyparser())

app.use(async (ctx, next) => {
  if (ctx.method === 'GET' && ctx.path === '/login') {
    ctx.body = `
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="">
      <input type="text" name="password" placeholder="">
      <button>提交</button>
   </form>
    `
  } else {
    next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/login') {
    console.log('ctx.request.body -> ', ctx.request.body)
    ctx.body = await ctx.request.body
  } else {
    next()
  }
})

app.listen(3000)
