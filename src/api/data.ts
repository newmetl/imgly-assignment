import * as constants from './constants';
import TreeNode from '../types/TreeNode';

export function getDataUrl() {
  return `${constants.BASE_API_URL}/${constants.DATA_PATH}.json`;
}

// GET /data.json
// Example: https://ubique.img.ly/frontend-tha/data.json
// TODO: how to make sure, the recieved data has needed type?
export function getData(): Promise<TreeNode[]> {
  return fetch(getDataUrl())
  .then((response) => response.json());
}
