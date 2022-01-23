export const fetchData = () => {
    return {
      type: "FETCH_DATA",
    };
  };

  export const filterData = (value) => {
    return {
      type: "FILTER_DATA",
      payload:value
    };
  };