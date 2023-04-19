import TreeNodeDetails from '../types/TreeNodeDetails';

// TODO: how to make sure, the recieved data has needed type?
export function getTreeNodeDetails(id: string): Promise<TreeNodeDetails> {
  return fetch(`https://ubique.img.ly/frontend-tha/entries/${id}.json`)
    .then((response) => {
      if (response.ok)
        return response.json();
      else if (!response.ok) {
        return Promise.reject('Couldn\'t load Data.');
      }
    })
}