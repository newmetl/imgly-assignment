export default interface TreeNode {
  orderIndex: number,
  parent: TreeNode | null,
  id?: string,
  label: string,
  children?: TreeNode[]
}