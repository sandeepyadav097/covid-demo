const initialState = {
    data: [],
    loading: false,
    error: null
  };
  

export default function fetchData(state = initialState, action) {
    
    switch (action.type) {
        case "FETCH_DATA":
        return { ...state, loading: true };
      case "FETCH_DATA_SUCCESS":
        return { ...state, loading: false, data: action.data };
      case "FETCH_DATA_FAILED":
        return { ...state, loading: false, error: action.message };
        case "FILTER_DATA":
          return { ...state, loading: true };
        case "FILTER_DATA_SUCCESS":
          return { ...state, loading: false, data: action.data, error:"" };
        case "FILTER_DATA_FAILED":
          return { ...state, loading: false, error: action.message};
      default:
        return state;
    }
  }

  