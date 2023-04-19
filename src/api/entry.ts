import * as constants from './constants';
import TreeNodeDetails from '../types/TreeNodeDetails';

export function getEntryUrl(id: string): string {
  return `${constants.BASE_API_URL}/${constants.ENTRY_PATH}/${id}.json`;
}

// GET /entries/${id}.json
// Example: https://ubique.img.ly/frontend-tha/entries/abcd-123.json
// TODO: how to make sure, the recieved data has needed type?
export function getEntry(id: string): Promise<TreeNodeDetails> {
  return fetch(getEntryUrl(id))
    .then((response) => {
      if (response.ok)
        return response.json();
      else if (!response.ok) {
        return Promise.reject('Couldn\'t load Data.');
      }
    })
}