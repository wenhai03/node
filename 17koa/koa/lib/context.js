const proto = {
  // get url(){
  //   return this.request.url
  // },
  // get path() {
  //   return this.request.path
  // }
}

function defineGetter(target, keys) {
  keys.forEach(key => {
     proto.__defineGetter__(key, function () {
       // this指代的是ctx上下文
       return this[target][key]
     })
  })
}

function defineSetter(target, keys) {
  keys.forEach(key => {
    proto.__defineSetter__(key, function (value) {
      this[target][key] = value
    })
  })
}

defineGetter('request', [
  'url',
  'path',
  'query',
])

defineGetter('response', [
  'body',
])

defineSetter('response', [
  'body',
])

module.exports = proto
