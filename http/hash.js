// 摘要算法 加密后能解密回来的  是加密算法
const crypto = require('crypto')

// md5算法 (非可逆的，摘要的内容如果相同，摘要出的结果就一样，雪崩效应，结果长度都是一致的)
// sha1 sha256  hmac
let hash = crypto.createHash('md5').update('helloWorld').digest('base64')
console.log(hash)
