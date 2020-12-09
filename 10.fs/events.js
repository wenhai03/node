function EventEmitter() {
  this._events = {} // this._events['失恋了'] = ['吃', '哭']
}

console.log('my -> ')

EventEmitter.prototype.on = function (eventName, callback) {
  console.log('this -> ', this)
  if (!this._events) {
    this._events = {}
  }
  
  let callbacks = this._events[eventName] || []
  callbacks.push(callback)
  this._events[eventName] = callbacks
  
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn(...args)
    })
  }
}

EventEmitter.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(event => {
       return (event !== callback) && (event.l !== callback)
    })
  }
}

EventEmitter.once = function (eventName, callback) {
  // 要等待callback 执行完毕后再删除操作
  const one = () => {
     callback()
    this.off(eventName, one)
  }
  one.l = callback // 自定义属性
  this.once(eventName, one) // once内部绑定的是one函数
}
module.exports = EventEmitter
