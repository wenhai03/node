const Koa = require('koa')

const app = new Koa()

// 请求到来后 会将中间件依次执行
app.use((ctx, next) => {
  console.log(1)
  next() // 让下一个中间件执行
  console.log(2)
})

app.use((ctx, next) => {
  console.log(3)
  next()
  console.log(4)
})

app.use((ctx, next) => {
  console.log(5)
  next() // 没有下一个就结束了
  console.log(6)
})

// 这么多函数会被包装成一个函数执行(组合函数 将多个函数组合起来)
// 基于async + await的 所有的异步方法在koa中都要封装成promise
app.listen(3000)

