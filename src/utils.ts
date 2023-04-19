import TreeNode from "./types/TreeNode";

// TODO: test this function
/**
 * Recursively iterate through tree data and add orderIndex and parent to every node.
 * @param parent Parent node of all nodes in nodeArray. Null for top level nodes.
 * @param nodeArray All children nodes of parent.
 * @returns Array of transformed nodes.
 */
export function transformData(parent: TreeNode | null, nodeArray: TreeNode[]): TreeNode[] {
  nodeArray.map((node: TreeNode, index: number) => {
    node.parent = parent;
    node.orderIndex = index;
    if (node.children)
      transformData(node, node.children);
  });
  return nodeArray;
}

// TODO: wirte test for this function
/**
 * Update orderIndex for the selected node and it's sibling.
 * @param treeNodes All tree nodes.
 * @param node The clicked node.
 * @param offset The offset by wich to move the node.
 * @returns All tree nodes including the updated nodes.
 */
export function moveNode(treeNodes: TreeNode[], node: TreeNode, offset: number): TreeNode[] {
  const clickedIndex = node.orderIndex;
  const children = node.parent?.children || treeNodes;
  const preNode = children.find((node) => node.orderIndex === clickedIndex + offset);

  if (preNode) {
    node.orderIndex = clickedIndex + offset;
    preNode.orderIndex = clickedIndex;
  }

  if (node.parent?.children) {
    // Create shallow copy to trigger re-render
    node.parent.children = [ ...node.parent?.children ];
  }

  return treeNodes;
}
