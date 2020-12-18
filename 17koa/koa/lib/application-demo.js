const EventEmitter = require('events')
const http = require('http')
const path = require('path')
const fs = require('fs')
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
  }
  
  use(requestCallback) {
    this.requestCallback = requestCallback
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
  
  handleRequest() {
    // this => application
    return (req, res) => {
      // 将req和res进行一次包装 => ctx上下文
      let ctx = this.createContext(req, res)
      this.requestCallback(ctx) // 调用了用户的回调方法 将ctx传入 内部会给ctx.bodu赋值
      // body 可以多次赋值 最后只取 最后一次
      let body = ctx.body
      if (body) {
        res.end(body)
      }
    }
  }
  listen(...args) {
    let server = http.createServer(this.handleRequest())
    
    server.listen(...args)
  }
}

module.exports = Application
