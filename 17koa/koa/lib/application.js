const EventEmitter = require('events')
const http = require('http')
const path = require('path')
const fs = require('fs')
const Stream = require('stream')
const context = require('./context') // 上下文
const request = require('./request') // 请求
const response = require('./response') // 响应


console.log('ok')
class Application extends EventEmitter{
  constructor(){
    super()
    // ctx.__proto__ = context
    // 为了多个应用不共享上下文
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    
    this.middleware = []
  }
  
  use(callback) {
    this.callback.push(callback)
  }
  createContext(req, res) {
    // ctx.__proto__.__proto__ = context
    // 为了保证每次请求时 都创建一个上下文
    let ctx = Object.create(this.context)
    let request = Object.create(this.request)
    let response = Object.create(this.response)
    ctx.request = request
    
    ctx.req = ctx.request.req = req
    ctx.response = response
    ctx.res = ctx.response.res = res
    return ctx
  }
  
  compose(ctx) {
    // 将多个promise链接到一起 组成一个promise链 依次执行 function next()
    // reduce 实现一个compose
    let index = -1  // 默认计数
    const dispatch = i => {
      if (i<=index) return Promise.reject(new Error('next() called multiple times'))
      index = i // 调用过后保存 i ，在同一个中间件多次调用next 这里的i是一样的
      
      if (i === this.middleware.length) return Promise.resolve()
      let middleware = this.middleware[i]
      // 调用next 方法会找到下一个中间件执行 await next() => await dispatch(i+1)
      // dispatch方法返回的是一个promise 所以第一个会等待第二个执行完毕
      return Promise.resolve( middleware(ctx, () => dispatch(i+1)) )
    }
    
    return dispatch(0) // 重点中间件的实现原理 用reduce 来实现compose方法 redux里的compose是一样
  
  }
  
  handleRequest() {
    // this => application
    return (req, res) => {
      // 将req和res进行一次包装 => ctx上下文
      let ctx = this.createContext(req, res)
      // this.requestCallback(ctx) // 调用了用户的回调方法 将ctx传入 内部会给ctx.body赋值
     this.compose(ctx).then(() => {
       // body 可以多次赋值 最后只取 最后一次
       let body = ctx.body
       if (body) {
         // 实现各种各样的类型，统一进行处理 字符串 buffer 流 数字  等
         if (body instanceof Stream) {
           // 默认急速下载文件，如果用户给了类型可以判断返回对应类型
           res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('下载'))
           body.pipe(res)
         } else if (typeof body === 'object') {
           res.setHeader('Content-Type', 'application/json')
           res.end(JSON.stringify(body))
         } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
           res.end(body)
         } else if (typeof body === 'number') {
           res.end(body + '') // 调用end 方法将用户设置的值返回
         }
       } else {
         res.end(`Not Found`)
       }
     })
    }
  }
  listen(...args) {
    let server = http.createServer(this.handleRequest())
  
    server.listen(...args)
  }
}

module.exports = Application
