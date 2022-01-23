const initialState = {
    data: [],
    loading: false,
    error: null
  };
  


export default function filterData(state = initialState, action) {
    
    switch (action.type) {
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

 
  