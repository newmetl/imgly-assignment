import TreeNode from "./types/TreeNode";

// TODO: test this function
export function transformData(parent: TreeNode | null, nodeArray: TreeNode[]): TreeNode[] {
  nodeArray.map((node: TreeNode, index: number) => {
    node.parent = parent;
    node.orderIndex = index;
    if (node.children)
      transformData(node, node.children);
  });
  return nodeArray;
}

// TODO: wirte test for this
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
