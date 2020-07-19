/**
 * 节点对象
 */
class TreeNode {
  constructor(key, data = null) {
    this.key = key
    this.left = null
    this.right = null
    this.data = data
  }
}

// 二叉树
class BinaryTree {
  constructor() {}

  /**
   * 有序二叉树
   * @param {*} arr 节点数组
   * @return object
   */
  createdOrderlyTree(arr) {
    let root = null
    if (!Array.isArray(arr) || !arr.length) return root
    arr.forEach(key => {
      const newNode = new TreeNode(key)
      if (!root) {
        root = newNode
      } else {
        this.inserOrderlyNode(root, newNode)
      }
    })
    return root
  }

  /**
   * 插入有序节点
   * @param {*} node 当前节点
   * @param {*} newNode 新节点
   */
  inserOrderlyNode(node, newNode) {
    const key = newNode.key < node.key ? 'left' : 'right'
    if (node[key] !== null) {
      this.inserOrderlyNode(node[key], newNode)
    } else {
      node[key] = newNode
    }
  }

  /**
   * 无序二叉树
   * 压栈法：根据当前深度添加节点到栈中，判断栈的长度和总节点数,然后循环取出当前深度层级栈中的节点遍历，并添加下一深度的节点进入栈中，根据深度计算更新当前总节点树
   * 根据长度(length)计算树的深度：Math.ceil(Math.log2(length + 1))
   * 根据深度(h)计算最大总节点数：Math.pow(2, h) - 1
   * 根据下标(index)计算左节点：index * 2 + 1
   * 根据下标(index)计算右节点：index * 2 + 2
   * @param {*} arr 节点数组
   * @return object
   */
  createdUnorderedTree(arr) {
    let root = null
    if (!Array.isArray(arr) || !arr.length) return root
    const length = arr.length // 总长度
    let h = 1 // 初始化二叉树深度为1
    let total = Math.pow(2, h) - 1 // 根据深度计算当前总节点树
    let stack = [] // 当前深度的节点队列
    // 初始化根结点
    if (!root) {
      root = new TreeNode(arr[0], 0)
      stack.push(root)
    }
    // 判断当前深度节点长度和总节点树
    while (stack.length && total <= length) {
      const nodes = stack.splice(0) // 从当前栈中取出所有的节点
      nodes.forEach(node => {
        const n = node.data // 获取当前节点的下标
        if (n >= length) return

        const leftIndex = n * 2 + 1 // 获取当前节点左孩子节点下标，判断是否超出
        if (leftIndex >= length) return
        node.left = new TreeNode(arr[leftIndex], leftIndex)
        stack.push(node.left) // 添加到栈队列中，进入下次循环

        const rightIndex = n * 2 + 2 // 获取当前节点右孩子节点下标，判断是否超出
        if (rightIndex >= length) return
        node.right = new TreeNode(arr[rightIndex], rightIndex)
        stack.push(node.right) // 添加到栈队列中，进入下次循环
      })
      // 更新当前深度的总节点数
      total = Math.pow(2, ++h) - 1
    }
    return root
  }

  /**
   * 前序遍历：先访问根结点，然后遍历左子树，最后遍历右子树。
   * 功能：可以复制一份二叉树
   * @param {*} tree 节点
   * @param {*} callback 回调
   */
  beforeOrderTraversal(tree, callback) {
    if (!tree || typeof callback !== 'function') return
    const { left, right } = tree
    callback(tree)
    this.beforeOrderTraversal(left, callback)
    this.beforeOrderTraversal(right, callback)
  }

  /**
   * 中序遍历：先遍历左子树，然后访问根结点，最后遍历右子树
   * 功能：可以做升序排列
   * @param {*} tree 节点
   * @param {*} callback 回调
   */
  inOrderTraversal(tree, callback) {
    if (!tree || typeof callback !== 'function') return
    const { left, right } = tree
    this.inOrderTraversal(left, callback)
    callback(tree)
    this.inOrderTraversal(right, callback)
  }

  /**
   * 后序遍历：先遍历左子树，然后遍历右子树，最后访问根结点
   * @param {*} tree 节点
   * @param {*} callback 回调
   */
  afterOrderTraversal(tree, callback) {
    if (!tree || typeof callback !== 'function') return
    const { left, right } = tree
    this.afterOrderTraversal(left, callback)
    this.afterOrderTraversal(right, callback)
    callback(tree)
  }
  /**
   * 查找节点
   * @param {*} tree 树对象
   * @param {*} key 查找的值
   * @return object|false
   */
  findNode(tree, key) {
    if (!tree) return false
    const val = tree.key
    if (key < val) {
      return this.findNode(tree.left, key)
    } else if (key > val) {
      return this.findNode(tree.right, key)
    } else {
      return tree
    }
  }

  /**
   * 查找最小值节点
   * @param {*} tree
   */
  min(tree) {
    if (tree && tree.left !== null) {
      return this.min(tree.left)
    } else {
      return tree
    }
  }

  /**
   * 查找最大值节点
   * @param {*} tree
   */
  max(tree) {
    if (tree && tree.right !== null) {
      return this.max(tree.right)
    } else {
      return tree
    }
  }

  /**
   * 删除节点
   * @param {*} tree 二叉树对象
   * @param {*} key 需要删除的key值
   */
  remove(tree, key) {
    tree = this.removeNode(tree, key)
    return tree
  }

  /**
   *
   * @param {*} node 节点
   * @param {*} key 删除的key值
   * @param {*} parentNode  父级节点
   * @return {*} object|null 删除的节点或者null
   */
  removeNode(node, key) {
    if (!node) return null

    // 叶子节点
    if (node.left === null && node.right === null) {
      return node.key === key ? null : node
    }

    if (key === node.key) {
      // 判断是否有右节点，用于把删除节点的左节点赋值给右节点最小值的左节点
      if (node.right !== null) {
        const min = this.min(node.right)
        min.left = node.left
        return node.right
      } else {
        return node.left
      }
    } else {
      // 根据比对的值确定遍历的方向
      const code = key < node.key ? 'left' : 'right'
      node[code] = this.removeNode(node[code], key)
      return node
    }
  }
}

// 公共参数
const tree = new BinaryTree()
const nodes = [5, 3, 8, 2, 9, 1, 4, 7, 6]
// let n = 0
// while (n < 50) {
//   nodes.push(Math.floor(Math.random() * 1000 + n))
//   n++
// }
// console.log('nodes>>>', nodes)

// 有序二叉树案例
const orderlyTree = tree.createdOrderlyTree(nodes)
console.log('有序二叉树对象:', JSON.stringify(orderlyTree))

// 无序二叉树案例
const unorderedTree = tree.createdUnorderedTree(nodes)
console.log('无序二叉树对象:', JSON.stringify(unorderedTree))

// 前序遍历
const beforeOrder = []
tree.beforeOrderTraversal(orderlyTree, node => {
  beforeOrder.push(node.key)
})
console.log('前序遍历:', beforeOrder)

// 中序遍历
const inOrder = []
tree.inOrderTraversal(orderlyTree, node => {
  inOrder.push(node.key)
})
console.log('中序遍历:', inOrder)

// 后序遍历
const afterOrder = []
tree.afterOrderTraversal(orderlyTree, node => {
  afterOrder.push(node.key)
})
console.log('后序遍历:', afterOrder)

// 查找最小值节点
const min = tree.min(orderlyTree)
console.log('查找最小值节点:', min)

// 查找最大值节点
const max = tree.max(orderlyTree)
console.log('查找最大值节点:', max)

// 查找节点
const findNode = tree.findNode(orderlyTree, 5)
console.log('查找节点:', findNode)

// 删除节点
const allNode = tree.remove(orderlyTree, 5)
console.log('删除后的二叉树:', JSON.stringify(allNode))
const sort = []
tree.inOrderTraversal(allNode, node => {
  sort.push(node.key)
})
console.log('中序遍历:', sort)
