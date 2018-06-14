// TreeNode class
class TreeNode
{
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree
{
    constructor()
    {
        // root of a binary seach tree
        this.root = null;
    }
 
    insert(data)
    {
        // Creating a node and initailising 
        // with data 
        var newTreeNode = new TreeNode(data);
                         
        // root is null then node will
        // be added to the tree and made root.
        if(this.root === null)
            this.root = newTreeNode;
        else
     
            // find the correct position in the 
            // tree and add the node
            this.insertTreeNode(this.root, newTreeNode);
    }
     
    insertTreeNode(node, newTreeNode)
    {
        // if the data is less than the node
        // data move left of the tree 
        if(newTreeNode.data < node.data)
        {
            // if left is null insert node here
            if(node.left === null)
                node.left = newTreeNode;
            else
     
                // if left is not null recurr until 
                // null is found
                this.insertTreeNode(node.left, newTreeNode); 
        }
     
        // if the data is more than the node
        // data move right of the tree 
        else
        {
            // if right is null insert node here
            if(node.right === null)
                node.right = newTreeNode;
            else
     
                // if right is not null recurr until 
                // null is found
                this.insertTreeNode(node.right,newTreeNode);
        }
    }

    remove(data)
    {
        // root is re-initialized with
        // root of a modified tree.
        this.root = this.removeTreeNode(this.root, data);
    }
     
    removeTreeNode(node, key)
    {
             
        // if the root is null then tree is 
        // empty
        if(node === null)
            return null;
     
        // if data to be delete is less than 
        // roots data then move to left subtree
        else if(key < node.data)
        {
            node.left = this.removeTreeNode(node.left, key);
            return node;
        }
     
        // if data to be delete is greater than 
        // roots data then move to right subtree
        else if(key > node.data)
        {
            node.right = this.removeTreeNode(node.right, key);
            return node;
        }
     
        // if data is similar to the root's data 
        // then delete this node
        else
        {
             // deleting node with no children
            if(node.left === null && node.right === null)
            {
                node = null;
                return node;
            }
     
            // deleting node with one children
            if(node.left === null)
            {
                node = node.right;
                return node;
            }
             
            else if(node.right === null)
            {
                node = node.left;
                return node;
            }
     
            // Deleting node with two children
            // minumum node of the rigt subtree
            // is stored in aux
            var aux = this.findMinTreeNode(node.right);
            node.data = aux.data;
     
            node.right = this.removeTreeNode(node.right, aux.data);
            return node;
        }
     
    }
                     
    findMinTreeNode(node)
    {
        // if left of a node is null
        // then it must be minimum node
        if(node.left === null)
            return node;
        else
            return this.findMinTreeNode(node.left);
    }

    getRootTreeNode()
    {
        return this.root;
    }

    search(node, data)
    {
       // if trees is empty return null
        if(node === null)
            return null;
     
        // if data is less than node's data
        // move left
        else if(data < node.data)
            return this.search(node.left, data);
     
        // if data is less than node's data
        // move left
        else if(data > node.data)
            return this.search(node.right, data);
     
        // if data is equal to the node data 
        // return node
        else
            return node;
    }
}