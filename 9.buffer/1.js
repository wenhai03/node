const fs = require('fs')
const path = require('path')

const iconvLite = require('iconv-lite')

let r = fs.readFileSync(path.resolve(__dirname, 'name.txt'))
console.log('r -> ', r)


let rs = iconvLite.decode(r, 'gbk')
console.log('rs -> ', rs)
