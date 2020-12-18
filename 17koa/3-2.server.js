const Koa = require('koa')
const sleep = () => {
   return new Promise((resolve, reject) => {
     setTimeout(() =>{
       resolve()
     }, 1000)
   })
}
const app = new Koa()

// 中间的应用 1)可以统一最先处理一些逻辑
// 2) 可以决定是否向下执行 3)可以扩展属性和方法

// 1)洋葱模型的好处可以做统一的错误处理 2)计算整个请求的时间
/*
app.use(async (ctx, next) => {
  if (ctx.headers.token) {
    next()
  } else {
    ctx.body = 'no authorization'
  }
})
*/

// 请求到来后 会将中间件依次执行
// 这些中间件会组成一个 (promise)函数 这个promise函数成功后，就会获取最终的结果来进行响应
/*app.use(async(ctx, next) => {
  ctx.token = ctx.headers['authorization'] || 'xxxx'
  
  console.log(1)
  ctx.body = 'hello'
  console.time('time')
  try {
    await next() // 让下一个中间件执行
  } catch (e) {
    console.log(e, '*************8')
  }
  console.timeEnd('time')
  console.log(2)
})

app.use(async(ctx, next) => {
  console.log(3)
  await sleep()
  await next()
  throw new Error('new Error')
  ctx.body = 'world'
  console.log(4)
})

app.use(async(ctx, next) => {
  ctx.body = '你好'
  console.log(5)
  await next() // 没有下一个就结束了
  console.log(6)
})*/

// 这么多函数会被包装成一个函数执行(组合函数 将多个函数组合起来)
// 基于async + await的 所有的异步方法在koa中都要封装成promise
// koa中所有的next前面都要加 await  return
app.listen(3000)

