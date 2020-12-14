const {Readable} = require('stream')

class MyRead extends Readable {
  _read(){
    this.push('ok') // push 方法是Readable中提供的 只要我们调用push将结果放入 就可以触发on('data事件')
    this.push(null) // 放入null的时候就结束了
  }
}

let mr = new MyRead()

mr.on('data', function (data) {
  console.log(data)
})

mr.on('end', function (data) {
  console.log('end')
})

mr.on('open', function (data) {
  console.log('open')
})

// 文件可读流   可读流   不是一样的  可读流就是继承可读流接口，并不需要用到fs模块
// 基于文件的可读流内部使用的是  fs.open  fs.close   on('data')
