const Koa = require('koa')
const app = new Koa()

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

const body = (ctx) => { // 可以将这个方法包装成一个use方法
  return new Promise((resolve, reject) => {
    let arr = []
    ctx.req.on('data', function (chunk) {
      arr.push(chunk)
    })
    ctx.req.on('end', function () {
      console.log('Buffer.concat(arr).toString() -> ', Buffer.concat(arr).toString())
      resolve(Buffer.concat(arr).toString())
    })
  })
}

app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/login') {
    ctx.body = await body(ctx)
  } else {
    next()
  }
})

app.listen(3000)
