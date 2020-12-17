// commonjs规范定义
// 每个文件都是一个模块
// 要通过module.exports 导出需要给别人使用的结果
// 导入需要的模块

// node中的模块 划分了几类 1 核心模块(fs 内置模块)  2 require() 文件模块 自定义模块  3第三方模块(需要安装)


// 1 核心模块很多 fs path vm  require内部是同步的
const fs = require('fs') // 一般有两种方法同步，异步的

const result = fs.readFileSync('./node.md', 'utf8')

const path = require('path') // 处理路径的

// __dirname 文件所在的目录 不能更改
console.log('111', path.resolve(__dirname, 'node.md')) // 你给我一个相对路径，我还你个绝对路径
const bool = fs.existsSync('./node.md')
console.log(' -> ', path.resolve(__dirname, 'node.md', 'a'))
// 只是简单的拼接
console.log(' ->222 ', path.join(__dirname, 'node.md', '/'))

// 如果遇到带/的路径 resolve会认为是根路径 join则是拼接在一起


console.log(path.extname('c.min.js')) // .js 取后缀名

console.log('path.dirname(__dirname) -> ', path.dirname(__dirname)) // __dirname == path.dirname
console.log('path.resolve(__dirname) -> ', path.resolve(__dirname))

const vm = require('vm')
let a = 1
const log = 'console.log(c)' // eval 执行时会查找上下文

// new Function也是可以产生一个执行环境，不依赖于外层作用域，必须包一层函数 模板引擎中会使用new Function
// let fn = new Function(log)
console.log('log', eval(log))

// console.log('fn() -> ', fn())
// vm.runInThisContext(log)
console.log(' -> ', )
