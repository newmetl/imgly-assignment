import TreeNode from "./types/TreeNode";

/**
 * Recursively iterate through tree data and add orderIndex and parent to every node.
 * @param parent Parent node of all nodes in nodeArray. Null for top level nodes.
 * @param nodeArray All children nodes of parent.
 * @returns Array of transformed nodes.
 */
// TODO: needs proper type checking for recieved data from API. Using workaround with any type.
export function transformData(parent: any | null, nodeArray: any[]): TreeNode[] {
  nodeArray.map((entry: TreeNode, index: number) => {
    entry.parent = parent;
    entry.orderIndex = index;
    if (entry.children)
      transformData(entry, entry.children);
  });
  return nodeArray;
}

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
