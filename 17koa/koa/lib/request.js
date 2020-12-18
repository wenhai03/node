const url = require('url')

const request = {
  get url(){  // Object.defineProperty
    // this = ctx.request === request
    return this.req.url
  },
  
  get query(){
    let {query} = url.parse(this.req.url, true)
    return query
  },
  get path(){
    let {pathname} = url.parse(this.req.url, true)
    return pathname
  }
}

module.exports = request
