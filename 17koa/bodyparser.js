const querystring = require('querystring')


function bodyParserPlugin() {
  return async (ctx, next) => {
    const body = await new Promise((resolve, reject) => {
      let arr = []
      // 如果没有请求会直接执行 end 方法
      ctx.req.on('data', function (chunk) {
        arr.push(chunk)
      })
      ctx.req.on('end', function () {
        resolve(Buffer.concat(arr).toString())
      })
    })
    ctx.request.body = querystring.parse(body)
    await next()
  }
}

module.exports = bodyParserPlugin
