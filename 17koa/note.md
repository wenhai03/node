## Koa概念
- 基于node的http模块进行了封装
- 我们可以基于koa实现自己的mvc框架(每个人用koa的方式可能不用，每个实现mvc的方式不同)，基于koa封装了egg
- 原来的http编写代码的缺陷(通过中间简化整个项目的逻辑)  req还有res不够强大  (通过ctx扩展了原有的方法)
- http基于回调方式的 (回调错误处理很麻烦 不能统一处理错误)

1)错误处理，可以使用async + await  2)中间件的机制use方法  3)ctx扩展了原生req和res源码是基于es6来编写 -> express(内部包含了很多内置中间件)
express采用老的回调的方式来实现


### cnpm i koa-bodyparser
