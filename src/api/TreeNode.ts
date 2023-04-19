import TreeNode from '../types/TreeNode';

// TODO: how to make sure, the recieved data has needed type?
export function getTreeNodes(): Promise<TreeNode[]> {
  return fetch('https://ubique.img.ly/frontend-tha/data.json')
  .then((response) => response.json());
}
