const Koa = require('koa')
const static = require('./koa-static')
const path = require('path')
// const Router = require('@koa/router')
const Router = require('./koa-router')

const app = new Koa()

// 中间件的注册顺序是有要求的 先走上面的 在走下面
app.use(static(__dirname))
app.use(static(path.join(__dirname, 'public')))

// 根据不同的请求方法和路径 返回不同的结果 路由
const router = new Router()
router.get('/add', async function (ctx, next) {
  ctx.body = 'add'
})
router.get('/remove', async function (ctx, next) {
  ctx.body = 'remove'
})

app.use(router.routes())

app.use(async ctx => {
   ctx.body = '1111111111'
})
app.listen(3000)
