## http中常见的状态码
- 101 websocket
- 200  204(没有响应体)  206(范围请求) 断点下载
- 304 缓存  对比缓存   301(永久重定向)  302(临时重定向)  seo优化

```
res.setHeader('cache-control', 'max-age=10')
单位是秒  key value 都是string

res.setHeader('Expires', new Date(Date.now()+10) * 1000)


```
