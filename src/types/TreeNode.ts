export default interface TreeNode {
  id?: string,
  orderIndex: number,
  parent: TreeNode | null,
  label: string,
  children?: TreeNode[]
}