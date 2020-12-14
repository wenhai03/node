// 链表 从头、从尾删除 或者添加 性能是比较好的
// 链表分为很多类 单向链表


class Node {
  constructor (element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor () {
    this.head = null // 默认应该指向第一个节点
    this.size = 0 // 通过这个长度，可以遍历这个链表
  }
  
  add(index, element) {
    if (arguments.length === 1) { // 就是向末尾添加
      element = index
      index = this.size
    }
    
    if (index < 0 || index > this.size) throw new Error('添加的索引不正常')
    if (index === 0) { // 在头部添加元素
      let head = this.head
      this.head = new Node(element, head)
    } else {
      // 先获取前一个
      let current = this.head
      // 不停遍历 找到最后一项
      
      // 添加的索引是 1 那就找到第0个
      for (let i=0; i< index-1; i++) { // 找到他的前一个
        current = current.next
      }
      current.next = new Node(element, current.next)
    }
    
    this.size++
  }
  
  remove(index) {
    if (index < 0 || index >= this.size) throw new Error('添加的索引不正常')
    this.size--
    if (index === 0) {
      let head = this.head
      this.head = this.head.next
      return head
    } else {
      let current = this.head
      for (let i=0; i< index-1; i++) { // 找到他的前一个
        current = current.next
      }
      let returnValue = current.next
      current.next = current.next.next
      return returnValue
    }
    
  }
  
  get(index) {
    if (index < 0 || index >= this.size) throw new Error('获取的索引不正常')
    let current = this.head
    for (let i=0;i<index;i++){
      current = current.next
    }
    return current
  }
}

let ll = new LinkedList()
ll.add(0, 1)
ll.add(0, 2)
ll.add(1,3)
ll.add(4) // 没有给索引就是末尾添加
console.log('ll.head -> ', ll.head)

class Queue{ // 实现一个队列 先进先出
  constructor () {
    this.ll = new LinkedList()
  }
  offer(element){ // 向队列中添加
    this.ll.add(element)
  }
  peek(){ // 查看第一个
    return this.ll.get(0)
  }
  remove(){
    return this.ll.remove(0)
  }
}

let queue = new Queue()
queue.offer(1)
queue.offer(2)
console.log('queue.ll -> ', queue.remove(0))
console.log(' -> ', queue.peek())
