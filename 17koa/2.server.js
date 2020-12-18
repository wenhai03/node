const Koa = require('./koa'); // 封装web服务 (通过类来封装)
const app = new Koa(); // 创建一个http应用
// js底层库 原型 + this指向 设计模式

// 1) context 应该是每次请求都创建一个全新的
// 2) 创建多个应用 用的上下文应该也是每次都是新的

app.use((ctx) => {  // 尽量不要使用ctx.res.end
  // 1) 是默认node自带的属性
  console.log('ctx.req.url', ctx.req.url)
  console.log('ctx.request.req.url', ctx.request.req.url)
  
  // 2) 自己封装了request属性
  console.log('ctx.request.url', ctx.request.url)
  console.log('ctx.url', ctx.url)
  // console.log('path', ctx.path)
  
  // ctx 封装了原生的req和res
  console.log('111', ctx.req.headers)
  
  ctx.body = '1111111111111111'
  console.log('ctx.response.body', ctx.response.body)
})
// 多个应用 我们希望context不是同一个人
app.listen(3000, function () {
  console.log(`server starting 3000`)
})

app.on('error', function(err){
  console.log('err---', err)
})


// use + listen + ctx + on('error')

// 1 先自己想怎么实现  2)看人家怎么实现  3)变成自己的
