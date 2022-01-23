import {url} from '../../config'

const fetchData = () => {
  return fetch(url+"getData", {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export default fetchData;