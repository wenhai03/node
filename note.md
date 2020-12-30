### 操作数据库
- 建库
  创建 myblog数据库
  执行show databases;查询
- 建表
- 表操作


```
insert into database    插入

-- select * from users     查询所有
-- select id,username from users  查询关键字
-- select * from user where username='zhagnsan'  查询有张三的
-- select * from users where username='zhangsan' and `password`='123';
select * from users where username='zhangsan' or `password`='123';

-- select * from users where username like '%zhang%'; 模糊查询
-- select * from users where password like '%1%'; 模糊查询
-- select * from users where password like '%1%' order by id desc; 根据id倒叙查询

update users set realname='李四2' where username='lisi'
(update users set realname='李四2' where username='lisi'	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00048 sec)
加上 SET SQL_SAFE_UPDATES=0;再执行，执行完后 select * from users 查看改变结果

-- delete from users where username='lisi';

-- select * from users where state='1';
-- update users set state='0' where username='lisi'; -- 软删除
如果用delete就回复不了 update可以软删除
不等于0的查询   select * from users where state<>'0'



insert into blogs(title,content,createtime,author) values('标题B', '内容B', '1609232169273','lisi');
select * from blogs order by createtime desc;

select * from blogs where title like '%标题%' order by createtime desc;
```

## ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '112012203';
### mysql下载 https://dev.mysql.com/downloads/mysql/
### workbench下载 https://dev.mysql.com/downloads/workbench/
### cnpm i mysql -S
