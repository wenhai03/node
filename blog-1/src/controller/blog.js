const {exec} = require('../db/mysql')


// xxx.html?a=1&k1=v1&k2=v2&k3=v3
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += `order by createtime desc;`
  // 返回 promise
  return exec(sql)
  // 先返回家数据(格式是正确的)
  /*return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: '1594567526767',
      author: '张三',
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: '15945675267657',
      author: '李四',
    }
  ]*/
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  
  return exec(sql).then(rows => {
    return rows[0]
  })
  
  /*// 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: '1594567526767',
    author: '张三',
  }*/
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象 包含 title content 属性
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()
  
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', '${createTime}', '${author}')
  `
  
  return exec(sql).then((insertData) => {
    console.log('insertData is', insertData)
    return {
      id: insertData.insertId  // 成功后，对象中有个insertId的值
    }
  })
  
  /*return {
    id: 3 // 表示新建博客，插入到📱表里面的 id
  }*/
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData是一个博客对象，包含title content属性
  const title = blogData.title
  const content = blogData.content
  
  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `
  
  return exec(sql).then(updateData => {
    console.log('updateData is', updateData)
    if (updateData.affectedRows > 0) {
      return true
    } else {
      return false
    }
  })
}

const delBlog = (id, {author}) => {
  console.log('id, author -> ', id, author)
  // id 就是要删除博客的 id
  const sql = `delete from blogs where id='${id} and author='${author}';`
  return exec(sql).then(delData => {
    console.log('delData is', delData)
    if (delData.affectedRows > 0) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
