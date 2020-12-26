## mac安装
- brew tap mongodb/brew
- brew install mongodb-community
- brew services start mongodb-community
- brew install mongodb-community

## 数据库分为两部分
- 服务端 mongod
- 客户端 mongo

> 如果希望手动启动 mongod --dbpath=路径 --port

## mongo导出结果
- mongoexport -u zhu -p zhu -d 数据库  -c 集合  --csv -f name,age -o xxx.csv


## mongoose
- mongodb node默认可以使用mongodb包来操作
- mongoose
让我们这种非关系型数据按照一定的格式来存储，并方便查询和做限制  orm工具语法和原生的mongo非常的相近  node中如何操作mongo
