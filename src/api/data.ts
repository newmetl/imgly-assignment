import * as constants from './constants';

/**
 * Get URL for data API.
 * @returns URL for data API.
 */
export function getDataUrl() {
  return `${constants.BASE_API_URL}/${constants.DATA_PATH}.json`;
}

/**
 * Fetch data from API.
 * GET /data.json
 * Example: https://ubique.img.ly/frontend-tha/data.json
 * @returns Promise of array of top level tree nodes.
*/
// TODO: needs proper type checking for recieved data from API
export function getData(): Promise<any[]> {
  return fetch(getDataUrl()).then((response) => response.json());
}
