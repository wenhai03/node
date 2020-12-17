const EventEmitter = require('./events')
const util = require('util')

function Girl() { // 需要继承这个EventEmitter里原型上的方法
}
// 继承了原型上的方法 es6 语法
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)
util.inherits(Girl, EventEmitter)

let girl = new Girl()


let eat = () => { console.log('吃')}
let cry = () => { console.log('哭')}
girl.on('失恋了', eat)
girl.on('失恋了', cry)
// 发布订阅 订阅 发布
girl.emit('失恋了')



/*
// on emit 可以订阅和发布

let events = new EventEmitter()

events.on('我饿了', () => {
  console.log('做饭')
})

events.on('我饿了', () => {
  console.log('吃饭')
})

events.emit('我饿了')*/
