const getList = (auth, keyword) => {
  // 先返回家数据(格式是正确的)
  
  return [
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
  ]
}

const getDetail = (id) => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: '1594567526767',
    author: '张三',
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象 包含 title content 属性
  return {
    id: 3 // 表示新建博客，插入到📱表里面的 id
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData是一个博客对象，包含title content属性
  
  return false
}

const delBlog = (id) => {
  // id 就是要删除博客的 id
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
