const Koa = require('./koa'); // 封装web服务 (通过类来封装)

console.log('Koa -> ', Koa)
const app = new Koa(); // 创建一个http应用

// 默认不会执行，当请求到来时 会执行此方法
app.use((ctx) => {  // ctx扩展了 req和res
  // throw new Error('出错了')
  ctx.body = `hello world`
  // res.end('ok')
})
// 创建一个http服务
app.listen(3000, function () {
  console.log(`server starting 3000`)
})

app.on('error', function(err){
  console.log('err---', err)
})


// use + listen + ctx + on('error')

// 1 先自己想怎么实现  2)看人家怎么实现  3)变成自己的
