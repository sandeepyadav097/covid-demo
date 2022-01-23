
import {url} from '../../config'

const filterData = (value) => {
  return fetch(url+`searchData?name=${value}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export default filterData;