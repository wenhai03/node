const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  console.log('method', req.method) // GET
  const url = req.url
  req.query = querystring.parse(url.split('?')[1])
  
  console.log('query', req.query)
  res.end(
    JSON.stringify(req.query)
  )
})

server.listen(8000)
console.log('ok')

/*
*
* http://localhost:8000/api/blog/list?author=zhang&keyword=A
*
* */
