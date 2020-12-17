const zlib = require('zlib')
const fs = require('fs')

// 压缩  .gz结尾的包 => gzip 压缩机制 重复性越高压缩率越高，可以还原


// 方式有 异步 同步 流  转化流 (读流 写流 转化流)
/*let content = fs.readFileSync('1.txt')
let r = zlib.gzipSync(content)
fs.writeFileSync('1.gzip', r)*/

// 转化流可以充当度 也可以充当写流 (继承了可读流和可写流)
fs.createReadStream('./1.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('1.gz'));

// node支持的压缩格式有两种 gzip  deflate  br
