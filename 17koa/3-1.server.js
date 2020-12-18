const Koa = require('koa')
const sleep = () => {
   return new Promise((resolve, reject) => {
     setTimeout(() =>{
       console.log('sleep')
       resolve()
     }, 1000)
   })
}
const app = new Koa()
// 1
// 3
// 2
// sleep
// 5
// 6
// 4

// next()都加上 await之后的输出
//1
// 3
// sleep
// 5
// 4
// 6
// 2
// 请求到来后 会将中间件依次执行
// 这些中间件会组成一个 (promise)函数 这个promise函数成功后，就会获取最终的结果来进行响应
app.use((ctx, next) => { // 1 3 sleep 5 6 4 2
  console.log(1)
  next() // 让下一个中间件执行
  console.log(2)
})

app.use(async(ctx, next) => {
  console.log(3)
  // await sleep()
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

// koa中所有的next前面都要加 await  return
app.listen(3000)

