const initState = {
    count: 1,
    users: []
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
    case 'setUsers':
      return {
          ...state,
          users: action.users
      };
    default:
      return state;
  };
}

export default baseReducer
