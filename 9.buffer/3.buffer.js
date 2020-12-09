// node中提供了一个类 可以来生成buffer

// 1.创建一个buffer的几种方法(内存) 默认buffer是不支持扩容的


// 创建的时候必须要指定大小 长度是字节的长度
let buf = Buffer.alloc(5)
console.log(buf)

let buf2 = Buffer.from([100.200, 257]) // 超过255 会对255 取余 0-255 一共256
console.log('buf2 -> ', buf2)

// 通过字符串来生成buffer
let buf3 = Buffer.from('珠峰')
console.log(buf3) // <Buffer e7 8f a0 e5 b3 b0>

// 拼接数据 buffer的拼接 截取功能 是不是buffer类型



let str = 'helloWorld'
str[1] = 1000
console.log('str -> ', str) // 如何把字符串进行重写操作  magic-string


console.log(Buffer.from('珠峰').slice(0, 3).toString())
console.log(Buffer.from('珠峰').toString('base64')) // 可以将base64h和字符串相互转化
console.log(Buffer.from('54+g5bOw', 'base64').toString())


let b1 = Buffer.from('珠峰')
let b2 = Buffer.from('架构')
// 扩容 弄一个更大的空间 将b1 b2 拷贝过去

let big = Buffer.alloc(12) // 单位都是字节


Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
  console.log('00 -> ')
  for (let i = sourceStart; i < sourceEnd; i++) {
    targetBuffer[targetStart++] = this[i]
  }
}

b1.copy(big, 0)
b2.copy(big, 6)


console.log(big.toString()) // 珠峰架构

Buffer.concat = function (bufferList, len = bufferList.reduce((a, b) => a + b.length, 0)) {
  console.log('concat00000 -> ')
  let buffer = Buffer.alloc(len)
  let offset = 0
  bufferList.forEach(buf => {
    buf.copy(buffer, offset)
    offset += buf.length
  })
  
  return buffer
}

console.log('concat', Buffer.concat([b1, b2]).toString())



// Buffer.isBuffer  length   slice() 截取的是内存里的值   toString()   concat()

// 前端的二进制叫arrayBuffer 后端的buffer 专门用来给后端服务










