## cookie session 和 localStorage SessionStorage区别
- localStorage SessionStorage(浏览器关闭后销毁) 存储到浏览器中 不能频繁设置localStorage，不能请求携带上  5M
- localStorage 默认不销毁(必须手动销毁)
- session 是基于cookie的
- http是无状态的 cookie可以用来识别状态 (客户端，服务端都可以设置)，每次请求服务器时都会发送到服务器(合理设置cookie，cookie默认是不安全的，不能用来存放敏感信息)

- session 基于cookie
