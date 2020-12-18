const path = require('path')
const fs = require('fs').promises  // 异步读取
const {readStream, createReadStream} = require('fs')
const mime = require('mime')

const layers = []


class Router {
  get(path, handler){
    layers.push({
      path,
      method: 'get',
      handler
    })
  }
  compose(handlers, ctx, next) {
    function dispatch(i) {
      if (i === handlers.length) {
        return next()
      }
      let middleware = handlers[i]
      
      return Promise.resolve(middleware(ctx, ()=> dispatch(i+1)))
    }
  
    return dispatch(0)
  }
  routes(){
    return async (ctx, next) => {
      let matchRoutes = layers.filter(layer=> {
         return ctx.method === layer.method && ctx.path === layer.path
      })
      // 方法是一个个对象里面 包的是promise
      this.compose(matchRoutes.map(layer => layer.handler), ctx, next)
      
    }
  }
}

module.exports = Router
