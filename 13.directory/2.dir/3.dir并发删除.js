const fs = require('fs')
const path = require("path")

// 类似promise的all并发删除
function rmdir (dir, cb) {
  fs.stat(dir, (err, statObj) => {
    if (statObj.isDirectory()) {
      fs.readdir(dir, function (err, dirs) {
        dirs = dirs.map(item => path.join(dir, item))
        // 儿子并发删除
        if (dirs.length === 0) { // 没有儿子
          return fs.rmdir(dir, cb)
        }
    
        let index = 0
        function done() {
            if (++index === dirs.length) {
              fs.rmdir(dir, cb)
            }
        }
        for (let i=0; i<dirs.length; i++) {
          let dir = dirs[i]
          rmdir(dir, done)
        }
        
      })
    } else {
      fs.unlinkSync(dir) // 删除文件即可
    }
  })
  
}

rmdir('a', function () {
  console.log('删除成功')
})
