## node
- 全局对象 global.xxx 可以直接访问 (Buffer, process)
- Buffer(isBuffer, slice, alloc, from, concat)
- process argv(commander) env(cross-env) cwd() nextTick platform
- 模块(核心 文件模块 第三方模块) 全局模块的编写(commonjs规范实现 (必会))
- npm的使用 包的发布 全局命令 局部命令 npm run dev / npx 版本号
- fs.readFile  fs.write  fs.close 文件流的内部采用的就是这些方法  (发布订阅模式的解耦)
- 可读流(基于文件的)  on('data') on('end') on('error')  pause resume / on('close')  on('open')
- 可写流(基于文件的) write end
