// binary tree example
let tree = {
    value: "-",
    left: {
        value: '+',
        left: {
            value: 'a',
        },
        right: {
            value: '*',
            left: {
                value: 'b',
            },
            right: {
                value: 'c',
            }
        }
    },
    right: {
        value: '/',
        left: {
            value: 'd',
        },
        right: {
            value: 'e',
        }
    }
}
// midorder recursion traversal 递归遍历 
let treeInList = []
let inOrderRec = (node) => {
    if(node){
        inOrderRec(node.left)
        treeInList.push(node.value)
        inOrderRec(node.right)
    }
}
inOrderRec(tree)
// console.log(treeInList)

// midOrder traversal with stack
let list = []
let inOrderUnRec = (node) => {
    let stack = []
    while(stack.length !== 0 || node) // 如果站不为空或者结点不为空，则循环遍历
    {   //找到最左子节点
        if(node) { 
            stack.push(node) 
            node = node.left
        } 
        // 如果node.left为空，则取出双亲结点，然后对右节点开始中序遍历。直到stack清空
        else { 
            node = stack.pop()
            list.push(node.value)
            node = node.right
        }
    }
}
inOrderUnRec(tree)
// console.log(list)

//preOrder recurision traversal
let preList = []
let preOrderRec = (node) => {
    if(node) {
        preList.push(node.value)
        preOrderRec(node.left)
        preOrderRec(node.right)
    }
}
preOrderRec(tree)
console.log(preList)

//preOrder unrecurision traversal
let preUnrecuList = []
// push node into stack, 1. get node.value 2. push node.right and node.left into stack(because stack "first in last out "). examine each point according to preOrder's principle.
let preOrderUnRec = (node) => {
    if (node) {
        let stack = []
        stack.push(node)
        while(stack.length !== 0) {
            node = stack.pop()
            preUnrecuList.push(node.value)
            if(node.right) {stack.push(node.right)}
            if(node.left) {stack.push(node.left)}
        } 
    }
}
//postOrder recurision traversal
let postListRec = []; //定义保存后序遍历结果的数组
let postOrderRec = function(node) {
    if (node) { //判断二叉树是否为空
        postOrderRec(node.left); //递归遍历左子树
        postOrderRec(node.right); //递归遍历右子树
        postListRec.push(node.value); //将结点的值存入数组中
    }
}
postOrderRec(tree);
console.log(postListRec);

//postOrder Unrecurision traversal
let postListUnRec = []; //定义保存后序遍历结果的数组
let postOrderUnRec = (node) => {
    if(node) {
        let stack = []
        stack.push(node)
        while(stack.length !==0) {
            let tmp = null
            tmp = stack[stack.length-1]
            if(tmp.left && tmp.left !== node && tmp.right !== node) {
                stack.push(tmp.left)
            }
            else if(tmp.right && tmp.right != node) {
                stack.push(tmp.right)
            }
            else{
                postListUnRec.push(stack.pop().value)
                node = tmp
            }
        }
    }
} 
postOrderUnRec(tree);
console.log(`unRec postOrder is: ${postListUnRec}`);

