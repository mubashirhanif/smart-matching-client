const initState = {
    count: 1
}

const baseReducer = (state = initState, action) => {
  switch (action.type) {
    case 'setApiUrl':
      return {
          ...state,
          url: action.url
      };
    case 'setGlobalCounter':
      return {
          ...state,
          count: action.count
      };
    default:
      return state;
  };
}

export default baseReducer
