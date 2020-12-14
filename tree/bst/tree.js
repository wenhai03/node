// 二叉搜索树

class Node {
  constructor (element, parent) {
    this.parent = parent // 父节点
    this.element = element // 当前存储内容
    this.left = null // 左子树
    this.right = null // 右子树
  }
}


class BST { // binary search tree
  constructor () {
    this.root = null // 树根
    this.size = 0 // 树中的节点个数
  }
  
  add (element) {
    if (this.root == null) {
      this.root = new Node(element, null)
      this.size++
      return
    }
    
    // 获取根节点 用当前添加的进行判断 放左边还是右边
    let currentNode = this.root
    let parent = null
    let compare
    while (currentNode){
      compare = element - currentNode.element
      parent = currentNode // 先将父亲保留起来
      if (compare > 0) {
        currentNode = currentNode.right
      } else if (compare < 0) {
        currentNode = currentNode.left
      } else {
        currentNode.element = element //相等时先覆盖后续处理
      }
      
      // currentNode要不停的发色变化
    }
    let newNode = new Node(element, parent)
    if (compare > 0) {
      parent.right = newNode
    } else if (compare < 0) {
      parent.left = newNode
    }
    this.size++
    // console.log(parent)
    
    // 判断当前的大小
    /*
    let compare = element - currentNode.element
    if (compare > 0) {
      currentNode.right = new Node(element, currentNode)
    } else if (compare < 0) {
      currentNode.left = new Node(element, currentNode)
    } else {
      currentNode.element = element
    }*/
  }
}

let bst = new BST();

[10, 8, 19, 6, 15, 22, 20].forEach(item => bst.add(item))

console.dir(bst.root, {depth: 20})
